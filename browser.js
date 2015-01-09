if(!BrowserInspect){
    var BrowserInspect={getNum:function(b,c){if(!this.num(b)){return null;
    }var a;
        if(typeof c=="undefined"){a=/[\d][\d\.\_,-]*/.exec(b);
        }else{a=(new RegExp(c)).exec(b);
        }return a?a[0].replace(/[\.\_-]/g,","):null;
    },hasMimeType:function(c){if(BrowserInspect.isIE){return null;
    }var b,a,d,e=c.constructor==String?[c]:c;
        for(d=0;
            d<e.length;
            d++){b=navigator.mimeTypes[e[d]];
            if(b&&b.enabledPlugin){a=b.enabledPlugin;
                if(a.name||a.description){return b;
                }}}return null;
    },findNavPlugin:function(g,d){var a=g.constructor==String?g:g.join(".*"),e=d===false?"":"\\d",b,c=new RegExp(a+".*"+e+"|"+e+".*"+a,"i"),f=navigator.plugins;
        for(b=0;
            b<f.length;
            b++){if(c.test(f[b].description)||c.test(f[b].name)){return f[b];
        }}return null;
    },AXO:window.ActiveXObject,getAXO:function(b,a){var f=null,d,c=false;
        try{f=new this.AXO(b);
            c=true;
        }catch(e1){}if(typeof a!="undefined"){
            return c;
        }return f;
    },num:function(a){return(typeof a!="string"?false:(/\d/).test(a));
    },compareNums:function(g,e){var d=this,c,b,a,f=window.parseInt;
        if(!d.num(g)||!d.num(e)){return 0;
        }if(d.plugin&&d.plugin.compareNums){return d.plugin.compareNums(g,e);
        }c=g.split(",");
        b=e.split(",");
        for(a=0;
            a<Math.min(c.length,b.length);
            a++){if(f(c[a],10)>f(b[a],10)){return 1;
        }if(f(c[a],10)<f(b[a],10)){return -1;
        }}return 0;
    },formatNum:function(b){if(!this.num(b)){return null;
    }var a,c=b.replace(/\s/g,"").replace(/[\.\_]/g,",").split(",").concat(["0","0","0","0"]);
        for(a=0;
            a<4;
            a++){if(/^(0+)(.+)$/.test(c[a])){c[a]=RegExp.$2;
        }}if(!(/\d/).test(c[0])){c[0]="0";
        }return c[0]+","+c[1]+","+c[2]+","+c[3];
    },initScript:function(){var $=this,userAgent=navigator.userAgent;
        $.isIE=
            /*@cc_on!@*/
            false;
        $.IEver=$.isIE&&((/MSIE\s*(\d\.?\d*)/i).exec(userAgent))?parseFloat(RegExp.$1,10):-1;
        $.ActiveXEnabled=false;
        if($.isIE){var x,progid=["Msxml2.XMLHTTP","Msxml2.DOMDocument","Microsoft.XMLDOM","ShockwaveFlash.ShockwaveFlash","TDCCtl.TDCCtl","Shell.UIHelper","Scripting.Dictionary","wmplayer.ocx"];
            for(x=0;
                x<progid.length;
                x++){if($.getAXO(progid[x],1)){$.ActiveXEnabled=true;
                break;
            }}$.head=typeof document.getElementsByTagName!="undefined"?document.getElementsByTagName("head")[0]:null;
        }$.isGecko=!$.isIE&&typeof navigator.product=="string"&&(/Gecko/i).test(navigator.product)&&(/Gecko\s*\/\s*\d/i).test(userAgent)?true:false;
        $.GeckoRV=$.isGecko?$.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(userAgent)?RegExp.$1:"0.9"):null;
        $.isSafari=!$.isIE&&(/Safari\s*\/\s*\d/i).test(userAgent)?true:false;
        $.isChrome=(/Chrome\s*\/\s*\d/i).test(userAgent)?true:false;
        $.onWindowLoaded(0);
    },init:function(c,a){if(typeof c!="string"){return -3;
    }c=c.toLowerCase().replace(/\s/g,"");
        var b=this,d;
        if(typeof b[c]=="undefined"){return -3;
        }d=b[c];
        b.plugin=d;
        if(typeof d.installed==="undefined"||a===true){d.installed=null;
            d.version=null;
            d.version0=null;
            d.getVersionDone=null;
            d.$=b;
        }b.garbage=false;
        if(b.isIE&&!b.ActiveXEnabled){if(b.plugin!=b.java){return -2;
        }}return 1;
    },isMinVersion:function(g,e,c,b){
        return -3;
    },getVersion:function(e,b,a){
        var d=BrowserInspect,c=d.init(e),f;
        if(c<0){return null;
        }f=d.plugin;
        if(f.getVersionDone!=1){f.getVersion(b,a);
            if(f.getVersionDone===null){f.getVersionDone=1;
            }}d.cleanup();
        return(f.version||f.version0);
    },getInfo:function(f,c,b){var a={};
        var e=BrowserInspect,d=e.init(f),g;
        if(d<0){return a;
        }g=e.plugin;
        if(typeof g.getInfo!="undefined"){if(g.getVersionDone===null){e.getVersion(f,c,b);
        }a=g.getInfo();
        }
        return a;
    },cleanup:function(){
        var a=this;
        if(a.garbage&&typeof window.CollectGarbage!="undefined"){window.CollectGarbage();
        }
    },isActiveXObject:function(b){
        var d=this,a,g,f="/",c='<object width="1" height="1" style="display:none" '+d.plugin.getCodeBaseVersion(b)+">"+d.plugin.HTML+"<"+f+"object>";
        if(d.head.firstChild){d.head.insertBefore(document.createElement("object"),d.head.firstChild);
        }else{d.head.appendChild(document.createElement("object"));
        }d.head.firstChild.outerHTML=c;
        try{d.head.firstChild.classid=d.plugin.classID;
        }catch(e1){}a=false;
        try{if(d.head.firstChild.object){a=true;
        }}catch(e1){}try{if(a&&d.head.firstChild.readyState<4){d.garbage=true;
        }}catch(e2){}d.head.removeChild(d.head.firstChild);
        return a;

    },codebaseSearch:function(c){var e=this;
        if(!e.ActiveXEnabled){return null;
        }if(typeof c!="undefined"){return e.isActiveXObject(c);
        }
        var j=[0,0,0,0],g,f,b=e.plugin.digits,i=function(k,m){var l=(k===0?m:j[0])+","+(k==1?m:j[1])+","+(k==2?m:j[2])+","+(k==3?m:j[3]);
            return e.isActiveXObject(l);
        };
        var h,d,a=false;
        for(g=0;
            g<b.length;
            g++){h=b[g]*2;
            j[g]=0;
            for(f=0;
                f<20;
                f++){if(h==1&&g>0&&a){break;
            }if(h-j[g]>1){d=Math.round((h+j[g])/2);
                if(i(g,d)){j[g]=d;
                    a=true;
                }else{h=d;
                }}else{if(h-j[g]==1){h--;
                if(!a&&i(g,h)){a=true;
                }break;
            }else{if(!a&&i(g,h)){a=true;
            }break;
            }}}if(!a){return null;
            }}return j.join(",");

    },dummy1:0};
}BrowserInspect.onDetectionDone=function(g,e,d,a){
    return -1;
};
BrowserInspect.onWindowLoaded=function(c){
    var b=BrowserInspect,a=window;
    if(b.EventWinLoad===true){}else{b.winLoaded=false;
        b.EventWinLoad=true;
        if(typeof a.addEventListener!="undefined"){a.addEventListener("load",b.runFuncs,false);
        }else{if(typeof a.attachEvent!="undefined"){a.attachEvent("onload",b.runFuncs);
        }else{if(typeof a.onload=="function"){b.funcs[b.funcs.length]=a.onload;
        }a.onload=b.runFuncs;
        }}}if(typeof c=="function"){b.funcs[b.funcs.length]=c;
    }
};
BrowserInspect.funcs=[0];
BrowserInspect.runFuncs=function(){var b=BrowserInspect,a;
    b.winLoaded=true;
    for(a=0;
        a<b.funcs.length;
        a++){if(typeof b.funcs[a]=="function"){b.funcs[a](b);
        b.funcs[a]=null;
    }}};
BrowserInspect.quicktime={mimeType:["video/quicktime","application/x-quicktimeplayer","image/x-macpaint","image/x-quicktime"],progID:"QuickTimeCheckObject.QuickTimeCheck.1",progID0:"QuickTime.QuickTime",classID:"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",minIEver:7,HTML:'<param name="src" value="A14999.mov" /><param name="controller" value="false" />',getCodeBaseVersion:function(a){return'codebase="#version='+a+'"';
},digits:[8,64,16,0],clipTo3digits:function(f){if(f===null||typeof f=="undefined"){return null;
}var e,d,h,g=this.$;
    e=f.split(",");
    if(g.compareNums(f,"7,60,0,0")<0&&g.compareNums(f,"7,50,0,0")>=0){d=e[0]+","+e[1].charAt(0)+","+e[1].charAt(1)+","+e[2];
    }else{d=e[0]+","+e[1]+","+e[2]+","+e[3];
    }h=d.split(",");
    return h[0]+","+h[1]+","+h[2]+",0";
},getVersion:function(){var a=null,d,b=this.$,e=true;
    if(!b.isIE){if(navigator.platform&&(/linux/i).test(navigator.platform)){e=false;
    }if(e){d=b.findNavPlugin(["QuickTime","(Plug-in|Plugin)"]);
        if(d&&d.name&&b.hasMimeType(this.mimeType)){a=b.getNum(d.name);
        }}this.installed=a?1:-1;
    }else{var c;
        if(b.IEver>=this.minIEver&&b.getAXO(this.progID0,1)){a=b.codebaseSearch();
        }else{c=b.getAXO(this.progID);
            if(c&&c.QuickTimeVersion){a=c.QuickTimeVersion.toString(16);
                a=a.charAt(0)+"."+a.charAt(1)+"."+a.charAt(2);
            }}this.installed=a?1:(b.getAXO(this.progID0,1)?0:-1);
    }this.version=this.clipTo3digits(b.formatNum(a));
}};
BrowserInspect.java={mimeType:"application/x-java-applet",classID:"clsid:8AD9C840-044E-11D1-B3E9-00805F499D93",DTKclassID:"clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA",DTKmimeType:"application/npruntime-scriptable-plugin;DeploymentToolkit",JavaVersions:[[1,9,2,25],[1,8,2,25],[1,7,2,25],[1,6,2,25],[1,5,2,25],[1,4,2,25],[1,3,1,25]],searchJavaPluginAXO:function(){var h=null,a=this,c=a.$,g=[],j=[1,5,0,14],i=[1,6,0,2],f=[1,3,1,0],e=[1,4,2,0],d=[1,5,0,7],b=false;
    if(!c.ActiveXEnabled){return null;
    }
    b=true;
    if(c.IEver>=a.minIEver){g=a.searchJavaAXO(i,i,b);
        if(g.length>0&&b){g=a.searchJavaAXO(j,j,b);
        }}else{
        if(b){g=a.searchJavaAXO(d,d,true);
        }
        if(g.length===0){g=a.searchJavaAXO(f,e,false);
        }}if(g.length>0){h=g[0];
    }a.JavaPlugin_versions=[].concat(g);
    return h;
},searchJavaAXO:function(l,i,m){var n,f,h=this.$,p,k,a,e,g,j,b,q=[];
    if(h.compareNums(l.join(","),i.join(","))>0){i=l;
    }i=h.formatNum(i.join(","));
    var o,d="1,4,2,0",c="JavaPlugin."+l[0]+""+l[1]+""+l[2]+""+(l[3]>0?("_"+(l[3]<10?"0":"")+l[3]):"");
    for(n=0;
        n<this.JavaVersions.length;
        n++){f=this.JavaVersions[n];
        p="JavaPlugin."+f[0]+""+f[1];
        g=f[0]+"."+f[1]+".";
        for(a=f[2];
            a>=0;
            a--){b="JavaWebStart.isInstalled."+g+a+".0";
            if(h.compareNums(f[0]+","+f[1]+","+a+",0",i)>=0&&!h.getAXO(b,1)){continue;
            }o=h.compareNums(f[0]+","+f[1]+","+a+",0",d)<0?true:false;
            for(e=f[3];
                e>=0;
                e--){k=a+"_"+(e<10?"0"+e:e);
                j=p+k;
                if(h.getAXO(j,1)&&(o||h.getAXO(b,1))){q[q.length]=g+k;
                    if(!m){return q;
                    }}if(j==c){return q;
                }}if(h.getAXO(p+a,1)&&(o||h.getAXO(b,1))){q[q.length]=g+a;
                if(!m){return q;
                }}if(p+a==c){return q;
            }}}return q;
},minIEver:7,getFromMimeType:function(a){var h,f,c=this.$,j=new RegExp(a),d,k,i={},e=0,b,g=[""];
    for(h=0;
        h<navigator.mimeTypes.length;
        h++){k=navigator.mimeTypes[h];
        if(j.test(k.type)&&k.enabledPlugin){k=k.type.substring(k.type.indexOf("=")+1,k.type.length);
            d="a"+c.formatNum(k);
            if(typeof i[d]=="undefined"){i[d]=k;
                e++;
            }}}for(f=0;
                   f<e;
                   f++){b="0,0,0,0";
        for(h in i){if(i[h]){d=h.substring(1,h.length);
            if(c.compareNums(d,b)>0){b=d;
            }}}g[f]=i["a"+b];
        i["a"+b]=null;
    }if(!(/windows|macintosh/i).test(navigator.userAgent)){g=[g[0]];
    }return g;
},queryJavaHandler:function(){var b=BrowserInspect.java,a=window.java,c;
    b.hasRun=true;
    try{if(typeof a.lang!="undefined"&&typeof a.lang.System!="undefined"){b.value=[a.lang.System.getProperty("java.version")+" ",a.lang.System.getProperty("java.vendor")+" "];
    }}catch(e1){}},queryJava:function(){var c=this,d=c.$,b=navigator.userAgent,f;
    if(typeof window.java!="undefined"&&navigator.javaEnabled()&&!c.hasRun){if(d.isGecko){if(d.hasMimeType("application/x-java-vm")){try{var g=document.createElement("div"),a=document.createEvent("HTMLEvents");
        a.initEvent("focus",false,true);
        g.addEventListener("focus",c.queryJavaHandler,false);
        g.dispatchEvent(a);
    }catch(e2){}if(!c.hasRun){c.queryJavaHandler();
    }}}else{if((/opera.9\.(0|1)/i).test(b)&&(/mac/i).test(b)){}else{if(!c.hasRun){c.queryJavaHandler();
    }}}}return c.value;
},forceVerifyTag:[],jar:[],VENDORS:["Sun Microsystems Inc.","Apple Computer, Inc."],init:function(){var a=this,b=a.$;
    if(typeof a.app!="undefined"){a.delJavaApplets(b);
    }a.hasRun=false;
    a.value=[null,null];
    a.useTag=[2,2,2];
    a.app=[0,0,0,0,0,0];
    a.appi=3;
    a.queryDTKresult=null;
    a.OTF=0;
    a.BridgeResult=[[null,null],[null,null],[null,null]];
    a.JavaActive=[0,0,0];
    a.All_versions=[];
    a.DeployTK_versions=[];
    a.MimeType_versions=[];
    a.JavaPlugin_versions=[];
    a.funcs=[];
    var c=a.NOTF;
    if(c){c.$=b;
        if(c.javaInterval){clearInterval(c.javaInterval);
        }c.EventJavaReady=null;
        c.javaInterval=null;
        c.count=0;
        c.intervalLength=250;
        c.countMax=40;
    }a.lateDetection=b.winLoaded;
    if(!a.lateDetection){b.onWindowLoaded(a.delJavaApplets);
    }},getVersion:function(f,l){var h,d=this,g=d.$,j=null,n=null,e=null,c=navigator.javaEnabled();
    if(d.getVersionDone===null){d.init();
    }var k;
    if(typeof l!="undefined"&&l.constructor==Array){for(k=0;
                                                        k<d.useTag.length;
                                                        k++){if(typeof l[k]=="number"){d.useTag[k]=l[k];
    }}}for(k=0;
           k<d.forceVerifyTag.length;
           k++){d.useTag[k]=d.forceVerifyTag[k];
    }if(typeof f!="undefined"){d.jar[d.jar.length]=f;
    }if(d.getVersionDone===0){if(!d.version||d.useAnyTag()){h=d.queryExternalApplet(f);
        if(h[0]){e=h[0];
            n=h[1];
        }}d.EndGetVersion(e,n);
        return;
    }var i=d.queryDeploymentToolKit();
    if(typeof i=="string"&&i.length>0){j=i;
        n=d.VENDORS[0];
    }if(!g.isIE){var q,m,b,o,a;
        a=g.hasMimeType(d.mimeType);
        o=(a&&c)?true:false;
        if(d.MimeType_versions.length===0&&a){h=d.getFromMimeType("application/x-java-applet.*jpi-version.*=");
            if(h[0]!==""){if(!j){j=h[0];
            }d.MimeType_versions=h;
            }}if(!j&&a){h="Java[^\\d]*Plug-in";
            b=g.findNavPlugin(h);
            if(b){h=new RegExp(h,"i");
                q=h.test(b.description)?g.getNum(b.description):null;
                m=h.test(b.name)?g.getNum(b.name):null;
                if(q&&m){j=(g.compareNums(g.formatNum(q),g.formatNum(m))>=0)?q:m;
                }else{j=q||m;
                }}}if(!j&&a&&(/macintosh.*safari/i).test(navigator.userAgent)){b=g.findNavPlugin("Java.*\\d.*Plug-in.*Cocoa",false);
            if(b){q=g.getNum(b.description);
                if(q){j=q;
                }}}if(j){d.version0=j;
            if(c){e=j;
            }}if(!e||d.useAnyTag()){b=d.queryExternalApplet(f);
            if(b[0]){e=b[0];
                n=b[1];
            }}if(!e){b=d.queryJava();
            if(b[0]){d.version0=b[0];
                e=b[0];
                n=b[1];
                if(d.installed==-0.5){d.installed=0.5;
                }}}if(d.installed===null&&!e&&o&&!(/macintosh.*ppc/i).test(navigator.userAgent)){h=d.getFromMimeType("application/x-java-applet.*version.*=");
            if(h[0]!==""){e=h[0];
            }}if(!e&&o){if(/macintosh.*safari/i.test(navigator.userAgent)){if(d.installed===null){d.installed=0;
        }else{if(d.installed==-0.5){d.installed=0.5;
        }}}}}else{if(!j&&i!=-1){j=d.searchJavaPluginAXO();
        if(j){n=d.VENDORS[0];
        }}if(!j){d.JavaFix();
    }if(j){d.version0=j;
        if(c&&g.ActiveXEnabled){e=j;
        }}if(!e||d.useAnyTag()){h=d.queryExternalApplet(f);
        if(h[0]){e=h[0];
            n=h[1];
        }}}if(d.installed===null){d.installed=e?1:(j?-0.2:-1);
    }d.EndGetVersion(e,n);
},EndGetVersion:function(b,d){var a=this,c=a.$;
    if(a.version0){a.version0=c.formatNum(c.getNum(a.version0));
    }if(b){a.version=c.formatNum(c.getNum(b));
        a.vendor=(typeof d=="string"?d:"");
    }if(a.getVersionDone!=1){a.getVersionDone=0;
    }},queryDeploymentToolKit:function(){var d=this,g=d.$,i,b,h=null,a=null;
    if((g.isGecko&&g.compareNums(g.GeckoRV,g.formatNum("1.6"))<=0)||g.isSafari||(g.isIE&&!g.ActiveXEnabled)){d.queryDTKresult=0;
    }if(d.queryDTKresult!==null){return d.queryDTKresult;
    }if(g.isIE&&g.IEver>=6){d.app[0]=g.instantiate("object",[],[]);
        h=g.getObject(d.app[0]);
    }else{if(!g.isIE&&g.hasMimeType(d.DTKmimeType)){d.app[0]=g.instantiate("object",["type",d.DTKmimeType],[]);
        h=g.getObject(d.app[0]);
    }}if(h){if(g.isIE&&g.IEver>=6){try{h.classid=d.DTKclassID;
    }catch(e1){}}try{var c,f=h.jvms;
        if(f){a=f.getLength();
            if(typeof a=="number"){for(b=0;
                                       b<a;
                                       b++){c=f.get(a-1-b);
                if(c){c=c.version;
                    if(g.getNum(c)){d.DeployTK_versions[b]=c;
                    }}}}}}catch(e1){}}g.hideObject(h);
    d.queryDTKresult=d.DeployTK_versions.length>0?d.DeployTK_versions[0]:(a===0?-1:0);
    return d.queryDTKresult;
},queryExternalApplet:function(d){var c=this,e=c.$,h=c.BridgeResult,b=c.app,g=c.appi,a="&nbsp;&nbsp;&nbsp;&nbsp;";
    if(typeof d!="string"||!(/\.jar\s*$/).test(d)){return[null,null];
    }if(c.OTF<1){c.OTF=1;
    }if(!e.isIE){if((e.isGecko||e.isChrome)&&!e.hasMimeType(c.mimeType)&&!c.queryJava()[0]){return[null,null];
    }}if(c.OTF<2){c.OTF=2;
    }if(!b[g]&&c.canUseObjectTag()&&c.canUseThisTag(0)){b[1]=e.instantiate("object",[],[],a);
        b[g]=e.isIE?e.instantiate("object",["archive",d,"code","A.class","type",c.mimeType],["archive",d,"code","A.class","mayscript","true","scriptable","true"],a):e.instantiate("object",["archive",d,"classid","java:A.class","type",c.mimeType],["archive",d,"mayscript","true","scriptable","true"],a);
        h[0]=[0,0];
        c.query1Applet(g);
    }if(!b[g+1]&&c.canUseAppletTag()&&c.canUseThisTag(1)){b[g+1]=e.instantiate("applet",["archive",d,"code","A.class","alt",a,"mayscript","true"],["mayscript","true"],a);
        h[1]=[0,0];
        c.query1Applet(g+1);
    }if(e.isIE&&!b[g+2]&&c.canUseObjectTag()&&c.canUseThisTag(2)){b[g+2]=e.instantiate("object",["classid",c.classID],["archive",d,"code","A.class","mayscript","true","scriptable","true"],a);
        h[2]=[0,0];
        c.query1Applet(g+2);
    }
    var j,f=0;
    for(j=0;
        j<h.length;
        j++){if(b[g+j]||c.canUseThisTag(j)){f++;
    }else{break;
    }}if(f==h.length){c.getVersionDone=1;
        if(c.forceVerifyTag.length>0){c.getVersionDone=0;
        }}return c.getBR();
},canUseAppletTag:function(){return((!this.$.isIE||navigator.javaEnabled())?true:false);
},canUseObjectTag:function(){return((!this.$.isIE||this.$.ActiveXEnabled)?true:false);
},useAnyTag:function(){var b=this,a;
    for(a=0;
        a<b.useTag.length;
        a++){if(b.canUseThisTag(a)){return true;
    }}return false;
},canUseThisTag:function(c){var a=this,b=a.$;
    if(a.useTag[c]==3){return true;
    }if(!a.version0||!navigator.javaEnabled()||(b.isIE&&!b.ActiveXEnabled)){if(a.useTag[c]==2){return true;
    }if(a.useTag[c]==1&&!a.getBR()[0]){return true;
    }}return false;
},getBR:function(){var b=this.BridgeResult,a;
    for(a=0;
        a<b.length;
        a++){if(b[a][0]){return[b[a][0],b[a][1]];
    }}return[b[0][0],b[0][1]];
},delJavaApplets:function(b){var c=b.java.app,a;
    for(a=c.length-1;
        a>=0;
        a--){b.uninstantiate(c[a]);
    }},query1Applet:function(g){var f,c=this,d=c.$,a=null,h=null,b=d.getObject(c.app[g],true);
    try{if(b){a=b.getVersion()+" ";
        h=b.getVendor()+" ";
        if(d.num(a)){c.BridgeResult[g-c.appi]=[a,h];
            d.hideObject(c.app[g]);
        }if(d.isIE&&a&&b.readyState!=4){d.garbage=true;
            d.uninstantiate(c.app[g]);
        }}}catch(e1){}},NOTF:{isJavaActive:function(){
}},append:function(e,d){for(var c=0;
                            c<d.length;
                            c++){e[e.length]=d[c];
}},getInfo:function(){var m={};
    var a=this,d=a.$,h,l=a.installed;
    m={All_versions:[],DeployTK_versions:[],MimeType_versions:[],DeploymentToolkitPlugin:(a.queryDTKresult===0?false:true),vendor:(typeof a.vendor=="string"?a.vendor:""),OTF:(a.OTF<3?0:(a.OTF==3?1:2))};
    var g=[null,null,null];
    for(h=0;
        h<a.BridgeResult.length;
        h++){g[h]=a.BridgeResult[h][0]?1:(a.JavaActive[h]==1?0:(a.useTag[h]>=1&&a.OTF>=1&&a.OTF!=3&&!(h==2&&!d.isIE)&&(a.BridgeResult[h][0]!==null||(h==1&&!a.canUseAppletTag())||(h!=1&&!a.canUseObjectTag())||l==-0.2||l==-1)?-1:null));
    }m.objectTag=g[0];
    m.appletTag=g[1];
    m.objectTagActiveX=g[2];
    var c=m.All_versions,k=m.DeployTK_versions,f=m.MimeType_versions,b=a.JavaPlugin_versions;
    a.append(k,a.DeployTK_versions);
    a.append(f,a.MimeType_versions);
    a.append(c,(k.length>0?k:(f.length>0?f:(b.length>0?b:(typeof a.version=="string"?[a.version]:[])))));
    for(h=0;
        h<c.length;
        h++){c[h]=d.formatNum(d.getNum(c[h]));
    }var i,e=null;
    if(!d.isIE){i=f.length>0?d.hasMimeType(a.mimeType+";jpi-version="+f[0]):d.hasMimeType(a.mimeType);
        if(i){e=i.enabledPlugin;
        }}m.name=e?e.name:"";
    m.description=e?e.description:"";
    var j=null;
    if((l===0||l==1)&&m.vendor===""){if(/macintosh/i.test(navigator.userAgent)){j=a.VENDORS[1];
    }else{if(!d.isIE&&(/windows/i).test(navigator.userAgent)){j=a.VENDORS[0];
    }else{if(/linux/i.test(navigator.userAgent)){j=a.VENDORS[0];
    }}}if(j){m.vendor=j;
    }}
    return m;
},JavaFix:function(){}};
BrowserInspect.devalvr={mimeType:"application/x-devalvrx",progID:"DevalVRXCtrl.DevalVRXCtrl.1",classID:"clsid:5D2CF9D0-113A-476B-986F-288B54571614",getVersion:function(){var a=null,g,c=this.$,f;
    if(!c.isIE){g=c.findNavPlugin("DevalVR");
        if(g&&g.name&&c.hasMimeType(this.mimeType)){a=g.description.split(" ")[3];
        }this.installed=a?1:-1;
    }else{var b,h,d;
        h=c.getAXO(this.progID,1);
        if(h){b=c.instantiate("object",["classid",this.classID],["src",""]);
            d=c.getObject(b);
            if(d){try{if(d.pluginversion){a="00000000"+d.pluginversion.toString(16);
                a=a.substr(a.length-8,8);
                a=parseInt(a.substr(0,2),16)+","+parseInt(a.substr(2,2),16)+","+parseInt(a.substr(4,2),16)+","+parseInt(a.substr(6,2),16);
            }}catch(e1){}}c.uninstantiate(b);
        }this.installed=a?1:(h?0:-1);
    }this.version=c.formatNum(a);
}};
BrowserInspect.flash={mimeType:["application/x-shockwave-flash","application/futuresplash"],progID:"ShockwaveFlash.ShockwaveFlash",classID:"clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",getVersion:function(){var c=function(i){if(!i){return null;
}var e=/[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(i);
    return e?e[0].replace(/[rRdD\.]/g,",").replace(/\s/g,""):null;
};
    var j,g=this.$,h,f,b=null,a=null,d=null;
    if(!g.isIE){j=g.findNavPlugin("Flash");
        if(j&&j.description&&g.hasMimeType(this.mimeType)){b=c(j.description);
        }}else{for(f=15;
                   f>2;
                   f--){a=g.getAXO(this.progID+"."+f);
        if(a){d=f.toString();
            break;
        }}if(d=="6"){try{a.AllowScriptAccess="always";
    }catch(e1){return"6,0,21,0";
    }}try{b=c(a.GetVariable("$version"));
    }catch(e1){}if(!b&&d){b=d;
    }}this.installed=b?1:-1;
    this.version=g.formatNum(b);
    return true;
}};

BrowserInspect.shockwave={mimeType:"application/x-director",progID:"SWCtl.SWCtl",classID:"clsid:166B1BCA-3F9C-11CF-8075-444553540000",getVersion:function(){var a=null,b=null,f,d,c=this.$;
    if(!c.isIE){d=c.findNavPlugin("Shockwave for Director");
        if(d&&d.description&&c.hasMimeType(this.mimeType)){a=c.getNum(d.description);
        }}else{try{b=c.getAXO(this.progID).ShockwaveVersion("");
    }catch(e1){}if(typeof b=="string"&&b.length>0){a=c.getNum(b);
    }else{if(c.getAXO(this.progID+".8",1)){a="8";
    }else{if(c.getAXO(this.progID+".7",1)){a="7";
    }else{if(c.getAXO(this.progID+".1",1)){a="6";
    }}}}}this.installed=a?1:-1;
    this.version=c.formatNum(a);
}};

BrowserInspect.div=null;
BrowserInspect.pluginSize=1;
BrowserInspect.DOMbody=null;
BrowserInspect.uninstantiate=function(a){var c,b=this;
    if(!a){return;
    }try{if(a[0]&&a[0].firstChild){a[0].removeChild(a[0].firstChild);
    }if(a[0]&&b.div){b.div.removeChild(a[0]);
    }if(b.div&&b.div.childNodes.length===0){b.div.parentNode.removeChild(b.div);
        b.div=null;
        if(b.DOMbody&&b.DOMbody.parentNode){b.DOMbody.parentNode.removeChild(b.DOMbody);
        }b.DOMbody=null;
    }a[0]=null;
    }catch(e1){}};
BrowserInspect.getObject=function(b,a){var f,c=this,d=null;
    try{if(b&&b[0]&&b[0].firstChild){d=b[0].firstChild;
    }}catch(e1){}try{if(a&&d&&typeof d.focus!="undefined"&&typeof document.hasFocus!="undefined"&&!document.hasFocus()){d.focus();
    }}catch(e2){}return d;
};
BrowserInspect.getContainer=function(a){var c,b=null;
    if(a&&a[0]){b=a[0];
    }return b;
};
BrowserInspect.hideObject=function(a){var b=this.getObject(a);
    if(b&&b.style){b.style.height="0";
    }};
BrowserInspect.instantiate=function(h,b,c,a){var j=function(d){var e=d.style;
    if(!e){return;
    }e.border="0px";
    e.padding="0px";
    e.margin="0px";
    e.fontSize=(g.pluginSize+3)+"px";
    e.height=(g.pluginSize+3)+"px";
    e.visibility="visible";
    if(d.tagName&&d.tagName.toLowerCase()=="div"){e.width="100%";
        e.display="block";
    }else{if(d.tagName&&d.tagName.toLowerCase()=="span"){e.width=g.pluginSize+"px";
        e.display="inline";
    }}};
    var k,l=document,g=this,p,i=(l.getElementsByTagName("body")[0]||l.body),o=l.createElement("span"),n,f,m="/";
    if(typeof a=="undefined"){a="";
    }p="<"+h+' width="'+g.pluginSize+'" height="'+g.pluginSize+'" ';
    for(n=0;
        n<b.length;
        n=n+2){p+=b[n]+'="'+b[n+1]+'" ';
    }p+=">";
    for(n=0;
        n<c.length;
        n=n+2){p+='<param name="'+c[n]+'" value="'+c[n+1]+'" />';
    }p+=a+"<"+m+h+">";
    if(!g.div){g.div=l.createElement("div");
        f=l.getElementById("BrowserInspect");
        if(f){j(f);
            f.appendChild(g.div);
        }else{if(i){try{if(i.firstChild&&typeof i.insertBefore!="undefined"){i.insertBefore(g.div,i.firstChild);
        }else{i.appendChild(g.div);
        }}catch(e1){}}else{try{l.write('<div id="pd33993399">o<'+m+"div>");
            i=(l.getElementsByTagName("body")[0]||l.body);
            i.appendChild(g.div);
            i.removeChild(l.getElementById("pd33993399"));
        }catch(e2){try{g.DOMbody=l.createElement("body");
            l.getElementsByTagName("html")[0].appendChild(g.DOMbody);
            g.DOMbody.appendChild(g.div);
        }catch(e3){}}}}j(g.div);
    }if(g.div&&g.div.parentNode&&g.div.parentNode.parentNode){g.div.appendChild(o);
        try{o.innerHTML=p;
        }catch(e1){}j(o);
        return[o];
    }return[null];
};
BrowserInspect.windowsmediaplayer={mimeType:["application/x-mplayer2","application/asx"],progID:"wmplayer.ocx",classID:"clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6",getVersion:function(){var a=null,e=this.$,b=null;
    this.installed=-1;
    if(!e.isIE){if(e.hasMimeType(this.mimeType)){if(e.findNavPlugin(["Windows","Media","(Plug-in|Plugin)"],false)||e.findNavPlugin(["Flip4Mac","Windows","Media"],false)){this.installed=0;
    }var d=e.isGecko&&e.compareNums(e.GeckoRV,e.formatNum("1.8"))<0;
        if(!d&&e.findNavPlugin(["Windows","Media","Firefox Plugin"],false)){var c=e.instantiate("object",["type",this.mimeType[0]],[]),f=e.getObject(c);
            if(f){a=f.versionInfo;
            }e.uninstantiate(c);
        }}}else{b=e.getAXO(this.progID);
        if(b){a=b.versionInfo;
        }}if(a){this.installed=1;
    }this.version=e.formatNum(a);
}};
BrowserInspect.silverlight={mimeType:"application/x-silverlight",progID:"AgControl.AgControl",digits:[9,20,9,12,31],getVersion:function(){var c=this.$,j=document,g=null,b=null,f=false;
    if(!c.isIE){var a=[null,null],e=c.findNavPlugin("Silverlight Plug-in",false),h=c.isGecko&&c.compareNums(c.GeckoRV,c.formatNum("1.6"))<=0;
        if(e&&c.hasMimeType(this.mimeType)){g=c.formatNum(e.description);
            if(g){p=g.split(",");
                if(parseInt(p[2],10)>=30226&&parseInt(p[0],10)<2){p[0]="2";
                }g=p.join(",");
            }if(c.isGecko&&!h){f=true;
            }if(!f&&!h&&g){a=c.instantiate("object",["type",this.mimeType],[]);
                b=c.getObject(a);
                if(b){if(typeof b.IsVersionSupported!="undefined"){f=true;
                }if(!f){b.data="data:"+this.mimeType+",";
                    if(typeof b.IsVersionSupported!="undefined"){f=true;
                    }}}c.uninstantiate(a);
            }}}else{b=c.getAXO(this.progID);
        var p=[1,0,1,1,1],l,k,o,i=function(d){return(d<10?"0":"")+d.toString();
        },m=function(q,d,s,t,r){return(q+"."+d+"."+s+i(t)+i(r)+".0");
        },n=function(d,s){var q,r=m((d===0?s:p[0]),(d==1?s:p[1]),(d==2?s:p[2]),(d==3?s:p[3]),(d==4?s:p[4]));
            try{return b.IsVersionSupported(r);
            }catch(e1){}return false;
        };
        if(b&&typeof b.IsVersionSupported!="undefined"){for(l=0;
                                                            l<this.digits.length;
                                                            l++){o=p[l];
            for(k=o+(l===0?0:1);
                k<=this.digits[l];
                k++){if(n(l,k)){f=true;
                p[l]=k;
            }else{break;
            }}if(!f){break;
            }}if(f){g=m(p[0],p[1],p[2],p[3],p[4]);
        }}}this.installed=f?1:-1;
    this.version=c.formatNum(g);
}};
BrowserInspect.vlc={mimeType:"application/x-vlc-plugin",progID:"VideoLAN.VLCPlugin",compareNums:function(d,c){var j=d.split(","),h=c.split(","),g,b,a,f,e,i;
    for(g=0;
        g<Math.min(j.length,h.length);
        g++){i=/([\d]+)([a-z]?)/.test(j[g]);
        b=parseInt(RegExp.$1,10);
        f=(g==2&&RegExp.$2.length>0)?RegExp.$2.charCodeAt(0):-1;
        i=/([\d]+)([a-z]?)/.test(h[g]);
        a=parseInt(RegExp.$1,10);
        e=(g==2&&RegExp.$2.length>0)?RegExp.$2.charCodeAt(0):-1;
        if(b!=a){return(b>a?1:-1);
        }if(g==2&&f!=e){return(f>e?1:-1);
        }}return 0;
},getVersion:function(){var b=this.$,d,a=null,c;
    if(!b.isIE){if(b.hasMimeType(this.mimeType)){d=b.findNavPlugin(["VLC","(Plug-in|Plugin)"],false);
        if(d&&d.description){a=b.getNum(d.description,"[\\d][\\d\\.]*[a-z]*");
        }}this.installed=a?1:-1;
    }else{d=b.getAXO(this.progID);
        if(d){try{a=b.getNum(d.VersionInfo,"[\\d][\\d\\.]*[a-z]*");
        }catch(e1){}}this.installed=d?1:-1;
    }this.version=b.formatNum(a);
}};
BrowserInspect.initScript();

var browser = (function() {
    return {
        details: function() {
            function identify_plugins(){
                var plugins = [];
                if(navigator.plugins){
                    var np = navigator.plugins;
                    for (var i = 0; i < np.length; i++) {

                        var plugin = np[i].name + ";";
                        if(np[i].filename)
                            plugin = plugin + " [" + np[i].filename + "]";

                        //if(np[i].description)
                        //    plugin = plugin + " <" + np[i].description + ">";

                        plugins.push(plugin);
                    }
                }else{
                    var default_plugins = {
                        "Java": null,
                        "QuickTime": null,
                        "DevalVR": null,
                        "Shockwave": null,
                        "Flash": null,
                        "WindowsMediaplayer": null,
                        "Silverlight": null,
                        "VLC": null
                    };

                    for(var plugin_name in default_plugins){
                        var version = BrowserInspect.getVersion(plugin_name);
                        if(version){
                            plugin_name = plugin_name + " " + version;
                            plugins.push(plugin_name);
                        }
                    }

                    var acrobat = ieAcrobatVersion();
                    if(acrobat){
                        plugins.push(acrobat);
                    }
                }
                plugins.sort();
                return plugins;
            }

            function ieAcrobatVersion() {
                // estimate the version of Acrobat on IE using horrible horrible hacks
                if (window.ActiveXObject) {
                    for (var x = 2; x < 10; x++) {
                        try {
                            oAcro=eval("new ActiveXObject('PDF.PdfCtrl."+x+"');");
                            if (oAcro)
                                return "Adobe Acrobat version" + x + ".?";
                        } catch(ex) {}
                    }
                    try {
                        oAcro4=new ActiveXObject('PDF.PdfCtrl.1');
                        if (oAcro4)
                            return "Adobe Acrobat version 4.?";
                    } catch(ex) {}
                    try {
                        oAcro7=new ActiveXObject('AcroPDF.PDF.1');
                        if (oAcro7)
                            return "Adobe Acrobat version 7.?";
                    } catch (ex) {}
                    return "";
                }
            }

            function get_fonts() {
                // Try flash first
                var fonts = "";
                var obj = document.getElementById("flashfontshelper");
                if (obj && typeof(obj.GetVariable) != "undefined") {
                    fonts = obj.GetVariable("/:user_fonts");
                    fonts = fonts.replace(/,/g,", ");
                    fonts += " (via Flash)";
                } else {
                    // Try java fonts
                    try {
                        var javafontshelper = document.getElementById("javafontshelper");
                        var jfonts = javafontshelper.getFontList();
                        for (var n = 0; n < jfonts.length; n++) {
                            fonts = fonts + jfonts[n] + ", ";
                        }
                        fonts += " (via Java)";
                    } catch (ex) {}
                }
                if ("" === fonts)
                    fonts = "No Flash or Java fonts detected";
                return fonts;
            }

            function set_dom_storage(){
                try {
                    localStorage.panopticlick = "yea";
                    sessionStorage.panopticlick = "yea";
                } catch (ex) { }
            }

            function test_dom_storage(){
                var supported = "";
                try {
                    if (localStorage.panopticlick == "yea") {
                        supported += "DOM localStorage: Yes";
                    } else {
                        supported += "DOM localStorage: No";
                    }
                } catch (ex) { supported += "DOM localStorage: No"; }

                try {
                    if (sessionStorage.panopticlick == "yea") {
                        supported += ", DOM sessionStorage: Yes";
                    } else {
                        supported += ", DOM sessionStorage: No";
                    }
                } catch (ex) { supported += ", DOM sessionStorage: No"; }

                return supported;
            }

            function test_ie_userdata(){
                try {
                    oPersistDiv.setAttribute("remember", "remember this value");
                    oPersistDiv.save("oXMLStore");
                    oPersistDiv.setAttribute("remember", "overwritten!");
                    oPersistDiv.load("oXMLStore");
                    if ("remember this value" == (oPersistDiv.getAttribute("remember"))) {
                        return ", IE userData: Yes";
                    } else {
                        return ", IE userData: No";
                    }
                } catch (ex) {
                    return ", IE userData: No";
                }
            }

            function get_language(){
                if(navigator.userLanguage !== undefined)
                    return navigator.userLanguage;
                if(navigator.languages !== undefined)
                    return navigator.languages[0];
                return navigator.language;
            }

            var details = {};
            var fingerprint = [];

            details.language = get_language();
            fingerprint.push(details.language);
            try{
                var ua = navigator.userAgent;
                details.user_agent = ua;
                fingerprint.push(ua);
            }catch(ex){
                //permission denied
                details.user_agent = "n/a";
            }

            try {
                var plugins = identify_plugins();
                details.plugins = plugins;
                fingerprint.push(plugins.join("|"));
            } catch(ex) {
                //permission denied;
                details.plugins = "n/a";
            }

            try {
                var fonts = get_fonts();
                details.fonts = fonts;
                fingerprint.push(fonts);
            } catch(ex) {
                //permission denied;
                details.fonts = "n/a";
            }

            try {
                var tz = new Date().getTimezoneOffset();
                details.timezone = tz;
                fingerprint.push(tz);
            } catch(ex) {
                //permission denied;
                details.timezone = "n/a";
            }

            try {
                var video = screen.width+"x"+screen.height+"x"+screen.colorDepth;
                details.video = video;
                fingerprint.push(video);
            } catch(ex) {
                //permission denied;
                details.video = "n/a";
            }

            try {
                var supercookies = test_dom_storage() + test_ie_userdata();
                details.supercookies = supercookies;
                fingerprint.push(supercookies);
            } catch(ex) {
                //permission denied;
                details.supercookies = "n/a";
            }

            var fp = fingerprint.join("|");
            var hash = md5.hash(fp);
            details.fingerprint = hash;
            return details;
        },
        track: function(force){
            var cookie_name = "x_browser_fingerprint";
            if(browserCookies.get(cookie_name) !== null){
                if(force !== true){
                    return;
                }
            }

            var details = browser.details();
            var fingerprint = details.fingerprint;
            browserCookies.set(cookie_name, fingerprint, 120);
            browserCookies.set("x_browser_details", b64.encode(JSON.stringify(details)));
        }
    };
})();


var browserCookies = (function() {
    return {
        set: function(name, value, days, secure) {
            if(days === null || days === undefined)
                days = 1;

            var date = new Date();
            date.setTime(date.getTime()+(days * 24 * 60 * 60 * 1000));
            var expires = "; expires="+date.toGMTString();
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        get: function(name){
            var key = name + "=";
            var parts = document.cookie.split(";");
            for(var i = 0; i<parts.length; i++){
                var part = parts[i];
                while(part.charAt(0) == ' ')
                    part = part.substring(1, part.length);
                if(part.indexOf(key) === 0){
                    var value = part.substring(key.length, part.length);
                    if(value === "")
                        return null;
                    return value;
                }

            }
            return null;
        },
        delete: function(name){
            var days = -1;
            var value = "";
            var date = new Date();
            date.setTime(date.getTime()+(days * 24 * 60 * 60 * 1000));
            var expires = "; expires="+date.toGMTString();
            document.cookie = name + "=" + value + expires + "; path=/";
        }
    };
})();



var b64 = (function() {
    return {
        encode: function(input) {
            var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = b64.utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) + keyStr.charAt(enc4);
            }
            return output;
        },

        decode: function(input){
            var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = b64.utf8_decode(output);
            return output;
        },

        utf8_encode: function(input) {
            input = input.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < input.length; n++) {
                var c = input.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },
        utf8_decode: function(input){
            var output = "";
            var i = 0;
            var c = 0;
            var c1 = 0;
            var c2 = 0;
            while ( i < input.length ) {
                c = input.charCodeAt(i);
                if (c < 128) {
                    output += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = input.charCodeAt(i+1);
                    output += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = input.charCodeAt(i+1);
                    c3 = input.charCodeAt(i+2);
                    output += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }
            return output;
        }
    };
})();


var md5 = (function() {
    return {
        hash: function(s) {
            function md5cycle(x, k) {
                var a = x[0], b = x[1], c = x[2], d = x[3];

                a = ff(a, b, c, d, k[0], 7, -680876936);
                d = ff(d, a, b, c, k[1], 12, -389564586);
                c = ff(c, d, a, b, k[2], 17,  606105819);
                b = ff(b, c, d, a, k[3], 22, -1044525330);
                a = ff(a, b, c, d, k[4], 7, -176418897);
                d = ff(d, a, b, c, k[5], 12,  1200080426);
                c = ff(c, d, a, b, k[6], 17, -1473231341);
                b = ff(b, c, d, a, k[7], 22, -45705983);
                a = ff(a, b, c, d, k[8], 7,  1770035416);
                d = ff(d, a, b, c, k[9], 12, -1958414417);
                c = ff(c, d, a, b, k[10], 17, -42063);
                b = ff(b, c, d, a, k[11], 22, -1990404162);
                a = ff(a, b, c, d, k[12], 7,  1804603682);
                d = ff(d, a, b, c, k[13], 12, -40341101);
                c = ff(c, d, a, b, k[14], 17, -1502002290);
                b = ff(b, c, d, a, k[15], 22,  1236535329);

                a = gg(a, b, c, d, k[1], 5, -165796510);
                d = gg(d, a, b, c, k[6], 9, -1069501632);
                c = gg(c, d, a, b, k[11], 14,  643717713);
                b = gg(b, c, d, a, k[0], 20, -373897302);
                a = gg(a, b, c, d, k[5], 5, -701558691);
                d = gg(d, a, b, c, k[10], 9,  38016083);
                c = gg(c, d, a, b, k[15], 14, -660478335);
                b = gg(b, c, d, a, k[4], 20, -405537848);
                a = gg(a, b, c, d, k[9], 5,  568446438);
                d = gg(d, a, b, c, k[14], 9, -1019803690);
                c = gg(c, d, a, b, k[3], 14, -187363961);
                b = gg(b, c, d, a, k[8], 20,  1163531501);
                a = gg(a, b, c, d, k[13], 5, -1444681467);
                d = gg(d, a, b, c, k[2], 9, -51403784);
                c = gg(c, d, a, b, k[7], 14,  1735328473);
                b = gg(b, c, d, a, k[12], 20, -1926607734);

                a = hh(a, b, c, d, k[5], 4, -378558);
                d = hh(d, a, b, c, k[8], 11, -2022574463);
                c = hh(c, d, a, b, k[11], 16,  1839030562);
                b = hh(b, c, d, a, k[14], 23, -35309556);
                a = hh(a, b, c, d, k[1], 4, -1530992060);
                d = hh(d, a, b, c, k[4], 11,  1272893353);
                c = hh(c, d, a, b, k[7], 16, -155497632);
                b = hh(b, c, d, a, k[10], 23, -1094730640);
                a = hh(a, b, c, d, k[13], 4,  681279174);
                d = hh(d, a, b, c, k[0], 11, -358537222);
                c = hh(c, d, a, b, k[3], 16, -722521979);
                b = hh(b, c, d, a, k[6], 23,  76029189);
                a = hh(a, b, c, d, k[9], 4, -640364487);
                d = hh(d, a, b, c, k[12], 11, -421815835);
                c = hh(c, d, a, b, k[15], 16,  530742520);
                b = hh(b, c, d, a, k[2], 23, -995338651);

                a = ii(a, b, c, d, k[0], 6, -198630844);
                d = ii(d, a, b, c, k[7], 10,  1126891415);
                c = ii(c, d, a, b, k[14], 15, -1416354905);
                b = ii(b, c, d, a, k[5], 21, -57434055);
                a = ii(a, b, c, d, k[12], 6,  1700485571);
                d = ii(d, a, b, c, k[3], 10, -1894986606);
                c = ii(c, d, a, b, k[10], 15, -1051523);
                b = ii(b, c, d, a, k[1], 21, -2054922799);
                a = ii(a, b, c, d, k[8], 6,  1873313359);
                d = ii(d, a, b, c, k[15], 10, -30611744);
                c = ii(c, d, a, b, k[6], 15, -1560198380);
                b = ii(b, c, d, a, k[13], 21,  1309151649);
                a = ii(a, b, c, d, k[4], 6, -145523070);
                d = ii(d, a, b, c, k[11], 10, -1120210379);
                c = ii(c, d, a, b, k[2], 15,  718787259);
                b = ii(b, c, d, a, k[9], 21, -343485551);

                x[0] = add32(a, x[0]);
                x[1] = add32(b, x[1]);
                x[2] = add32(c, x[2]);
                x[3] = add32(d, x[3]);

            }

            function cmn(q, a, b, x, s, t) {
                a = add32(add32(a, q), add32(x, t));
                return add32((a << s) | (a >>> (32 - s)), b);
            }

            function ff(a, b, c, d, x, s, t) {
                return cmn((b & c) | ((~b) & d), a, b, x, s, t);
            }

            function gg(a, b, c, d, x, s, t) {
                return cmn((b & d) | (c & (~d)), a, b, x, s, t);
            }

            function hh(a, b, c, d, x, s, t) {
                return cmn(b ^ c ^ d, a, b, x, s, t);
            }

            function ii(a, b, c, d, x, s, t) {
                return cmn(c ^ (b | (~d)), a, b, x, s, t);
            }

            function md51(s) {
                txt = '';
                var n = s.length,
                    state = [1732584193, -271733879, -1732584194, 271733878], i;
                for (i=64; i<=s.length; i+=64) {
                    md5cycle(state, md5blk(s.substring(i-64, i)));
                }
                s = s.substring(i-64);
                var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
                for (i=0; i<s.length; i++)
                    tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
                tail[i>>2] |= 0x80 << ((i%4) << 3);
                if (i > 55) {
                    md5cycle(state, tail);
                    for (i=0; i<16; i++) tail[i] = 0;
                }
                tail[14] = n*8;
                md5cycle(state, tail);
                return state;
            }

            /* there needs to be support for Unicode here,
             * unless we pretend that we can redefine the MD-5
             * algorithm for multi-byte characters (perhaps
             * by adding every four 16-bit characters and
             * shortening the sum to 32 bits). Otherwise
             * I suggest performing MD-5 as if every character
             * was two bytes--e.g., 0040 0025 = @%--but then
             * how will an ordinary MD-5 sum be matched?
             * There is no way to standardize text to something
             * like UTF-8 before transformation; speed cost is
             * utterly prohibitive. The JavaScript standard
             * itself needs to look at this: it should start
             * providing access to strings as preformed UTF-8
             * 8-bit unsigned value arrays.
             */
            function md5blk(s) { /* I figured global was faster.   */
                var md5blks = [], i; /* Andy King said do it this way. */
                for (i=0; i<64; i+=4) {
                    md5blks[i>>2] = s.charCodeAt(i) + (s.charCodeAt(i+1) << 8) + (s.charCodeAt(i+2) << 16) + (s.charCodeAt(i+3) << 24);
                }
                return md5blks;
            }

            var hex_chr = '0123456789abcdef'.split('');

            function rhex(n)
            {
                var s='', j=0;
                for(; j<4; j++)
                    s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
                return s;
            }

            function hex(x) {
                for (var i=0; i<x.length; i++)
                    x[i] = rhex(x[i]);
                return x.join('');
            }


            /* this function is much faster,
             so if possible we use it. Some IEs
             are the only ones I know of that
             need the idiotic second function,
             generated by an if clause.  */

            function add32(a, b) {
                return (a + b) & 0xFFFFFFFF;
            }
            return hex(md51(s));
        }
    };
})();