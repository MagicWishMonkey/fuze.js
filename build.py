#!/usr/bin/env python

from __future__ import print_function
import os
import sys
import subprocess
import codecs
import shutil
import hashlib
import dateutil.parser
from os.path import expanduser
import base64 as __b64__
try:
    import simplejson as __json__
except ImportError:
    import json as __json__
    

class clipboard:
    def __init__(self):
        def macSetClipboard(text):
            outf = os.popen('pbcopy', 'w')
            outf.write(text)
            outf.close()

        def macGetClipboard():
            outf = os.popen('pbpaste', 'r')
            content = outf.read()
            outf.close()
            return content

        self.getter = macGetClipboard
        self.setter = macSetClipboard

    @staticmethod
    def read():
        return clipboard().getter()

    @staticmethod
    def write(o):
        return clipboard().setter(o)



class io:
    @staticmethod
    def read_file(path, text=True):
        if path.startswith("~"):
            relative = path[1:]
            path = expanduser("~")
            path = "%s%s" % (path, relative)

        if text is False:
            try:
                with open(path, "rb") as f:
                    data = f.read()
                    return data
            except Exception, ex:
                message = "Error reading file [ {file} ] -> {message}".format(file=path, message=ex.message)
                print(message)
                raise Exception(message)

        try:
            with codecs.open(path, "r", "utf-8") as f:
                data = f.read()
                return data
        except Exception, ex:
            message = "Error reading file [ {file} ] -> {message}".format(file=path, message=ex.message)
            print(message)
            raise Exception(message)

    @staticmethod
    def write_file(path, data, text=False):
        if path.startswith("~"):
            relative = path[1:]
            path = expanduser("~")
            path = "%s%s" % (path, relative)

        if isinstance(data, list) is True:
            data = "\n".join(data)

        if io.exists(path) is True:
            os.remove(path)

        if text is False:
            try:
                with open(path, "wb") as f:
                    f.write(data)
                return
            except Exception, ex:
                message = "Error writing file [ {file} ] -> {message}".format(file=path, message=ex.message)
                print(message)
                raise Exception(message)

        try:
            with codecs.open(path, "w", "utf-8") as f:
                f.write(data)
        except Exception, ex:
            message = "Error writing file [ {file} ] -> {message}".format(file=path, message=ex.message)
            print(message)
            raise Exception(message)

    @staticmethod
    def create(path, overwrite=False):
        if path.startswith("~"):
            relative = path[1:]
            path = expanduser("~")
            path = "%s%s" % (path, relative)

        if io.exists(path) is True:
            if overwrite is False:
                return
            io.delete(path)

        try:
            os.makedirs(path)
        except Exception, ex:
            if io.exists(path) is True:
                return
            raise ex

    @staticmethod
    def delete(uri):
        if uri.startswith("~"):
            relative = uri[1:]
            uri = expanduser("~")
            uri = "%s%s" % (uri, relative)

        if io.exists(uri) is False:
            return

        if uri.endswith(os.sep) is False:
            try:
                os.remove(uri)
            except Exception, ex:
                message = "Error deleting file '{uri}' -> {message}".format(uri=uri, message=ex.message)
                print(message)
            return

        #this is a folder
        for current, dirs, files in os.walk(uri):
            for file in files:
                path = os.path.join(current, file)
                os.remove(path)

            for dir in dirs:
                path = "{path}{name}{sep}".format(path=current, name=dir, sep=os.sep)
                io.delete(path)
        try:
            os.rmdir(uri)
        except Exception, ex:
            message = "Error deleting folder '{uri}' -> {message}".format(uri=uri, message=ex.message)
            print(message)

    @staticmethod
    def file_size(uri):
        st = os.stat(uri)
        bytes = st.st_size
        kb = 1 if bytes <= 1024 else int(round((float(bytes) / float(1024)), 2))
        return kb

    @staticmethod
    def move(src, dst):
        shutil.move(src, dst)

    @staticmethod
    def copy(src, dst):
        shutil.copy2(src, dst)

    @staticmethod
    def exists(uri):
        """Return true if the file/folder exists."""
        return True if os.path.exists(uri) else False

    @staticmethod
    def relative(uri, path):
        new_uri = os.path.join(uri, path)
        new_uri = os.path.normpath(new_uri)
        return new_uri

    @staticmethod
    def rename(src, dst):
        if dst.find(os.sep) == -1:
            parts = src.split(os.sep)
            parts[len(parts) - 1] = dst
            dst = os.sep.join(parts)

        os.rename(src, dst)

    @staticmethod
    def parent(uri):
        parts = uri.split(os.sep)
        parts = parts[:len(parts) - 1]
        uri = os.sep.join(parts)
        uri = "{uri}{sep}".format(uri=uri, sep=os.sep)
        return uri

    @staticmethod
    def name(uri):
        parts = uri.split(os.sep)
        return parts[len(parts) - 1]

    @staticmethod
    def files(uri, **kwd):
        return io.contents(uri, **kwd)[1]

    @staticmethod
    def folders(uri, **kwd):
        return io.contents(uri, **kwd)[0]

    @staticmethod
    def contents(uri, **kwd):
        recursive = kwd.get("recursive", False)
        patterns = kwd.get("patterns", [])
        if isinstance(patterns, list) is False:
            patterns = [patterns]

        for x, p in enumerate(patterns):
            pattern = p.strip().lower()
            if len(pattern) == 0:
                patterns[x] = None
                continue

            if pattern[0] == "." and len(pattern) > 1:
                ext = pattern[1:]
                if ext.find(".") == -1:
                    pattern = "*%s" % pattern
            patterns[x] = pattern

        patterns = [p for p in patterns if p is not None]
        def __walk__(folder_list, file_list, recursive, patterns, uri):
            for current, folders, files in os.walk(uri):
                if len(patterns) > 0:
                    for file in files:
                        name = file.lower()
                        for pattern in patterns:
                            if pattern[0] == "*":
                                if name.endswith(pattern[1:]):
                                    file_list.append(os.path.join(current, file))
                            elif name.find(pattern) > -1:
                                file_list.append(os.path.join(current, file))
                else:
                    for file in files:
                        file = os.path.join(current, file)
                        file_list.append(file)

                for folder in folders:
                    folder_list.append(os.path.join(current, folder))

                if recursive is False:
                    return folders, files

        folders, files = [], []
        __walk__(folders, files, recursive, patterns, uri)
        return folders, files



class Wrapper(dict):
    def override(self, other):
        def override(a, b):
            keys = b.keys()
            for key in keys:
                o = b[key]
                if isinstance(o, dict) is True:
                    try:
                        i = a[key]
                        for k in o.keys():
                            i[k] = o[k]
                    except KeyError:
                        a[key] = o
                else:
                    a[key] = o

        override(self, other)
        return self

    def __getattr__(self, key):
        try:
            o = self[key]
            if isinstance(o, dict) is True:
                if isinstance(o, Wrapper) is False:
                    o = Wrapper.create(o)
                    self[key] = o
            return o
        except KeyError:
            return None

    def __setattr__(self, key, value):
        self[key] = value

    def __delattr__(self, key):
        try:
            del self[key]
        except KeyError:
            pass

    def reduce(self, fn=None):
        obj = {}
        keys = self.keys()
        for key in keys:
            v = self[key]
            if isinstance(v, list) and len(v) > 0 and hasattr(v[0], "reduce"):
                for x in xrange(len(v)):
                    v[x] = v[x].reduce()

            obj[key] = v
        if fn:
            return fn(obj)
        return obj

    def clone(self):
        return Wrapper(self.copy())

    def __repr__(self):
        return '<Wrapper ' + dict.__repr__(self) + '>'

    @staticmethod
    def create(*args, **kwargs):
        if args and len(args) > 0:
            return Wrapper(args[0])
        return Wrapper(kwargs)


class console:
    __colors__ = None
    #default = ""

    @staticmethod
    def colors():
        colors = console.__colors__
        if colors is None:
            colors = Wrapper({
                "ul": "",
                "white": "",
                "red": "",
                "green": "",
                "yellow": "",
                "blue": "",
                "pink": "",
                "default": ""
            })
            console.__colors__ = colors
            try:
                from colorama import init as init_colorama, Fore, Style
                colors.ul = "\x1b[%sm" * 3 % (2, 4, 33)
                colors.white = "\x1b[%sm" % 0
                cols = ["\x1b[%sm" % n for n in range(91, 96)]
                colors.red = cols[0]
                colors.green = cols[1]
                colors.yellow = cols[2]
                colors.blue = cols[3]
                colors.pink = cols[4]
                colors.default = colors.white;
                #print(colors.ul)
            except ImportError:
                sys.stdout.write("***THE COLORAMA MODULE IS NOT INSTALLED***")
        return colors

    @staticmethod
    def red(*message, **kwd):
        kwd["color"] = "red"
        console.write(*message, **kwd)

    @staticmethod
    def green(*message, **kwd):
        kwd["color"] = "green"
        console.write(*message, **kwd)

    @staticmethod
    def yellow(*message, **kwd):
        kwd["color"] = "yellow"
        console.write(*message, **kwd)

    @staticmethod
    def pink(*message, **kwd):
        kwd["color"] = "pink"
        console.write(*message, **kwd)

    @staticmethod
    def white(*message, **kwd):
        kwd["color"] = "white"
        console.write(*message, **kwd)

    @staticmethod
    def ul(*message, **kwd):
        if kwd.get("color", None) is None:
            kwd["color"] = "ul"
        else:
            kwd["ul"] = True
        console.write(*message, **kwd)

    @staticmethod
    def blue(*message, **kwd):
        kwd["color"] = "blue"
        console.write(*message, **kwd)

    @staticmethod
    def write(*message, **kwd):
        default = console.colors().default
        color = kwd.get("color", None)
        if color is not None:
            color = console.colors()[color]
        padding = kwd.get("padding", kwd.get("pad", None))
        buffer = [color] if color is not None else []
        #if kwd.get("ul", True) is True:
        #    buffer.append(console.colors().ul)
        for msg in message:
            if padding is not None:
                if isinstance(padding, basestring) is False:
                    padding = "".join([" " for x in xrange(padding)])
                lines = msg.split("\n")
                for x, l in enumerate(lines):
                    line = "%s%s" % (padding, l)
                    lines[x] = line
                msg = "\n".join(lines)
            buffer.append(msg)
        if color is not None:
            buffer.append(default)
        txt = "".join(buffer)
        print(txt)

    @staticmethod
    def ask(message, force=False, color=None):
        if message.endswith(" ") is False:
            message = "%s " % message

        # console.red("")
        sys.stdout.write(message)

        #console.write(message, color=color)
        txt = sys.stdin.readline().replace("\n", "")
        if len(txt) == 0:
            while force is True:
                sys.stdout.write(message)
                #console.write(message, color=color)
                txt = sys.stdin.readline().replace("\n", "")
                if len(txt) > 0:
                    return txt
            return None
        if txt.lower() == "y" or txt.lower() == "yes" or txt == "1":
            return True
        if txt.lower() == "n" or txt.lower() == "no" or txt == "0":
            return False
        return txt

    @staticmethod
    def prompt(txt):
        response = console.ask(txt)
        while response is None:
            response = console.ask(txt)
        return response


def md5(data):
    return hashlib.md5(data).hexdigest()


def parse_date(date):
    return dateutil.parser.parse(date)

def stringify(o):
    if isinstance(o, (basestring, int, bool, float)):
        return str(o)

    if isinstance(o, (dict, list)):
        return json(o, indent=2)

    try:
        return o.strftime("%Y-%m-%d %H:%M:%S")#dateutil.parser.parse(o)
    except:
        return str(o)

def trace(txt):
    if txt is None:
        return
    sys.stdout.write(txt)
    sys.stdout.write("\n")



def json(obj, indent=None, sort_keys=True, pretty=False):
    """Convert the object instance into a json blob."""
    assert obj is not None, "The input parameter is null!"

    try:
        if indent:
            return __json__.dumps(obj, check_circular=False, sort_keys=sort_keys, indent=indent)
        else:
            if pretty is True:
                return __json__.dumps(obj, check_circular=False, sort_keys=sort_keys, indent=2)
            return __json__.dumps(obj, check_circular=False, sort_keys=sort_keys)
    except Exception, ex:
        message = "Unable to encode the object to json-> %s" % ex.message
        raise Exception(message)



def unjson(data, silent=False):
    """Convert the json blob into an object instance."""
    assert data is not None, "The input parameter is null!"

    if silent is True:
        try:
            txt = data.strip()
            pfx, sfx = txt[0], txt[len(txt) - 1]
            if pfx == "[" and sfx == "]" or pfx == "{" and sfx == "}":
                try:
                    return __json__.loads(data, strict=False)
                except:
                    return None
            return None
        except:
            return None

    try:
        return __json__.loads(data, strict=False)
    except Exception, ex:
        message = "Unable to decode the json object-> %s" % ex.message
        raise Exception(message)


def rcurry(f, *a, **kw):
    def curried(*more_a, **more_kw):
        return f(*(more_a + a), **dict(kw, **more_kw))
    return curried


def curry(f, *a, **kw):
    def curried(*more_a, **more_kw):
        return f(*(a + more_a), **dict(kw, **more_kw))
    return curried
    

def execute(cmd, *params, **kwd):
    fn = None
    if len(params) > 0:
        params = list(params)
        if isinstance(params[len(params) - 1], basestring) is False:
            fn = params[len(params) - 1]
            params.pop()

    if len(kwd) > 0:
        buffer = [cmd]
        for key in kwd:
            val = kwd[key]
            buffer.append("%s=%s" % (key, str(val)))
        cmd = " ".join(buffer)

    process = subprocess.Popen(
        cmd,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        stdin=subprocess.PIPE,
        close_fds=True
    )

    output = process.stdout.read()
    result = process.wait()
    if result:
        #print(output)
        #message = "Error running command: %s %s\n%s" % (cmd, str(result), output)
        raise Exception(output)

    if output is None or len(output.strip()) == 0:
        return None

    output = output.strip()
    if fn is not None:
        o = fn(output)
        if o is not None:
            output = o
    return output


console.blue("=============================================================")
console.blue(" COMPILE > LINT > MINIFY")
console.blue("=============================================================")

ignore, successes, failures = [], [], []
files = io.files(os.getcwd(), patterns=".coffee")
for file in files:
    name = file.split(os.sep)
    name = name[len(name) - 1]
    try:
        console.yellow("  COMPILE-> %s" % name)
        execute("coffee -c %s" % name)

        name = "%s.js" % name[0:len(name) - 7]
        ignore.append(name)
    except Exception, ex:
        output = ex.message
        console.red(output)

if len(ignore) > 0:
    console.write("")

files = io.files(os.getcwd(), patterns=".js")
for file in files:
    if file.endswith("jquery.js") is True:
        continue
    if file.endswith(".min.js") is True:
        continue

    name = file.split(os.sep)
    name = name[len(name) - 1]
    if name in ignore:
        continue
    try:
        console.yellow("  LINT-> %s" % name)
        execute("jshint %s" % name)
        #console.yellow("%s      - PASSED" % name)
        successes.append(name)
    except Exception, ex:
        output = ex.message
        lines = output.strip().split("\n")
        lines = lines[0:len(lines) - 1]
        lines = [l for l in lines if len(l.strip()) > 0 and l.find("eval can be harmful") == -1]
        if len(lines) == 0:
            # console.yellow("%s      - PASSED" % name)
            successes.append(name)
        else:
            failures.append((name, output))

if len(successes) > 0:
    console.write("")

for name in successes:
    console.yellow("  MINIFY-> %s" % name)
    try:
        output = execute("uglifyjs %s -c -m" % name).strip()
        if output.startswith("WARN:"):
            lines = output.split("\n")
            for x, l in enumerate(lines):
                if l.startswith("WARN:"):
                    continue
                output = "\n".join(lines[x:])
                break

        mini_name = "%s.min.js" % name[0:len(name) - 3]
        io.write_file(mini_name, output, text=True)
    except Exception, ex:
        message = ex.message
        console.red("***ERROR WITH MINIFIER*** %s" % message)

for o in failures:
    name = o[0]
    lines = o[1].strip().split("\n")
    error_count = lines[len(lines) - 1]
    console.pink("%s - FAILED [%s ERRORS]" % (name, error_count))
    for x, l in enumerate(lines):
        if x > 10:
            console.red("   ...")
            break
        console.red("   %s" % l)


