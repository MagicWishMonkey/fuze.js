var browser = (function() {
    return {
        details: function() {
            var md5=function(){return{hash:function(e){function t(e,t){var n=e[0],u=e[1],a=e[2],f=e[3];n=r(n,u,a,f,t[0],7,-680876936);f=r(f,n,u,a,t[1],12,-389564586);a=r(a,f,n,u,t[2],17,606105819);u=r(u,a,f,n,t[3],22,-1044525330);n=r(n,u,a,f,t[4],7,-176418897);f=r(f,n,u,a,t[5],12,1200080426);a=r(a,f,n,u,t[6],17,-1473231341);u=r(u,a,f,n,t[7],22,-45705983);n=r(n,u,a,f,t[8],7,1770035416);f=r(f,n,u,a,t[9],12,-1958414417);a=r(a,f,n,u,t[10],17,-42063);u=r(u,a,f,n,t[11],22,-1990404162);n=r(n,u,a,f,t[12],7,1804603682);f=r(f,n,u,a,t[13],12,-40341101);a=r(a,f,n,u,t[14],17,-1502002290);u=r(u,a,f,n,t[15],22,1236535329);n=i(n,u,a,f,t[1],5,-165796510);f=i(f,n,u,a,t[6],9,-1069501632);a=i(a,f,n,u,t[11],14,643717713);u=i(u,a,f,n,t[0],20,-373897302);n=i(n,u,a,f,t[5],5,-701558691);f=i(f,n,u,a,t[10],9,38016083);a=i(a,f,n,u,t[15],14,-660478335);u=i(u,a,f,n,t[4],20,-405537848);n=i(n,u,a,f,t[9],5,568446438);f=i(f,n,u,a,t[14],9,-1019803690);a=i(a,f,n,u,t[3],14,-187363961);u=i(u,a,f,n,t[8],20,1163531501);n=i(n,u,a,f,t[13],5,-1444681467);f=i(f,n,u,a,t[2],9,-51403784);a=i(a,f,n,u,t[7],14,1735328473);u=i(u,a,f,n,t[12],20,-1926607734);n=s(n,u,a,f,t[5],4,-378558);f=s(f,n,u,a,t[8],11,-2022574463);a=s(a,f,n,u,t[11],16,1839030562);u=s(u,a,f,n,t[14],23,-35309556);n=s(n,u,a,f,t[1],4,-1530992060);f=s(f,n,u,a,t[4],11,1272893353);a=s(a,f,n,u,t[7],16,-155497632);u=s(u,a,f,n,t[10],23,-1094730640);n=s(n,u,a,f,t[13],4,681279174);f=s(f,n,u,a,t[0],11,-358537222);a=s(a,f,n,u,t[3],16,-722521979);u=s(u,a,f,n,t[6],23,76029189);n=s(n,u,a,f,t[9],4,-640364487);f=s(f,n,u,a,t[12],11,-421815835);a=s(a,f,n,u,t[15],16,530742520);u=s(u,a,f,n,t[2],23,-995338651);n=o(n,u,a,f,t[0],6,-198630844);f=o(f,n,u,a,t[7],10,1126891415);a=o(a,f,n,u,t[14],15,-1416354905);u=o(u,a,f,n,t[5],21,-57434055);n=o(n,u,a,f,t[12],6,1700485571);f=o(f,n,u,a,t[3],10,-1894986606);a=o(a,f,n,u,t[10],15,-1051523);u=o(u,a,f,n,t[1],21,-2054922799);n=o(n,u,a,f,t[8],6,1873313359);f=o(f,n,u,a,t[15],10,-30611744);a=o(a,f,n,u,t[6],15,-1560198380);u=o(u,a,f,n,t[13],21,1309151649);n=o(n,u,a,f,t[4],6,-145523070);f=o(f,n,u,a,t[11],10,-1120210379);a=o(a,f,n,u,t[2],15,718787259);u=o(u,a,f,n,t[9],21,-343485551);e[0]=h(n,e[0]);e[1]=h(u,e[1]);e[2]=h(a,e[2]);e[3]=h(f,e[3])}function n(e,t,n,r,i,s){t=h(h(t,e),h(r,s));return h(t<<i|t>>>32-i,n)}function r(e,t,r,i,s,o,u){return n(t&r|~t&i,e,t,s,o,u)}function i(e,t,r,i,s,o,u){return n(t&i|r&~i,e,t,s,o,u)}function s(e,t,r,i,s,o,u){return n(t^r^i,e,t,s,o,u)}function o(e,t,r,i,s,o,u){return n(r^(t|~i),e,t,s,o,u)}function u(e){txt="";var n=e.length,r=[1732584193,-271733879,-1732584194,271733878],i;for(i=64;i<=e.length;i+=64){t(r,a(e.substring(i-64,i)))}e=e.substring(i-64);var s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<e.length;i++)s[i>>2]|=e.charCodeAt(i)<<(i%4<<3);s[i>>2]|=128<<(i%4<<3);if(i>55){t(r,s);for(i=0;i<16;i++)s[i]=0}s[14]=n*8;t(r,s);return r}function a(e){var t=[],n;for(n=0;n<64;n+=4){t[n>>2]=e.charCodeAt(n)+(e.charCodeAt(n+1)<<8)+(e.charCodeAt(n+2)<<16)+(e.charCodeAt(n+3)<<24)}return t}function l(e){var t="",n=0;for(;n<4;n++)t+=f[e>>n*8+4&15]+f[e>>n*8&15];return t}function c(e){for(var t=0;t<e.length;t++)e[t]=l(e[t]);return e.join("")}function h(e,t){return e+t&4294967295}var f="0123456789abcdef".split("");return c(u(e))}}}()

            if(!BrowserInspect){var BrowserInspect={getNum:function(e,t){if(!this.num(e)){return null}var n;if(typeof t=="undefined"){n=/[\d][\d\.\_,-]*/.exec(e)}else{n=(new RegExp(t)).exec(e)}return n?n[0].replace(/[\.\_-]/g,","):null},hasMimeType:function(e){if(BrowserInspect.isIE){return null}var t,n,r,i=e.constructor==String?[e]:e;for(r=0;r<i.length;r++){t=navigator.mimeTypes[i[r]];if(t&&t.enabledPlugin){n=t.enabledPlugin;if(n.name||n.description){return t}}}return null},findNavPlugin:function(e,t){var n=e.constructor==String?e:e.join(".*"),r=t===false?"":"\\d",i,s=new RegExp(n+".*"+r+"|"+r+".*"+n,"i"),o=navigator.plugins;for(i=0;i<o.length;i++){if(s.test(o[i].description)||s.test(o[i].name)){return o[i]}}return null},AXO:window.ActiveXObject,getAXO:function(e,t){var n=null,r,i=false;try{n=new this.AXO(e);i=true}catch(r){}if(typeof t!="undefined"){delete n;return i}return n},num:function(e){return typeof e!="string"?false:/\d/.test(e)},compareNums:function(e,t){var n=this,r,i,s,o=window.parseInt;if(!n.num(e)||!n.num(t)){return 0}if(n.plugin&&n.plugin.compareNums){return n.plugin.compareNums(e,t)}r=e.split(",");i=t.split(",");for(s=0;s<Math.min(r.length,i.length);s++){if(o(r[s],10)>o(i[s],10)){return 1}if(o(r[s],10)<o(i[s],10)){return-1}}return 0},formatNum:function(e){if(!this.num(e)){return null}var t,n=e.replace(/\s/g,"").replace(/[\.\_]/g,",").split(",").concat(["0","0","0","0"]);for(t=0;t<4;t++){if(/^(0+)(.+)$/.test(n[t])){n[t]=RegExp.$2}}if(!/\d/.test(n[0])){n[0]="0"}return n[0]+","+n[1]+","+n[2]+","+n[3]},initScript:function(){var e=this,t=navigator.userAgent;e.isIE=false;e.IEver=e.isIE&&/MSIE\s*(\d\.?\d*)/i.exec(t)?parseFloat(RegExp.$1,10):-1;e.ActiveXEnabled=false;if(e.isIE){var n,r=["Msxml2.XMLHTTP","Msxml2.DOMDocument","Microsoft.XMLDOM","ShockwaveFlash.ShockwaveFlash","TDCCtl.TDCCtl","Shell.UIHelper","Scripting.Dictionary","wmplayer.ocx"];for(n=0;n<r.length;n++){if(e.getAXO(r[n],1)){e.ActiveXEnabled=true;break}}e.head=typeof document.getElementsByTagName!="undefined"?document.getElementsByTagName("head")[0]:null}e.isGecko=!e.isIE&&typeof navigator.product=="string"&&/Gecko/i.test(navigator.product)&&/Gecko\s*\/\s*\d/i.test(t)?true:false;e.GeckoRV=e.isGecko?e.formatNum(/rv\s*\:\s*([\.\,\d]+)/i.test(t)?RegExp.$1:"0.9"):null;e.isSafari=!e.isIE&&/Safari\s*\/\s*\d/i.test(t)?true:false;e.isChrome=/Chrome\s*\/\s*\d/i.test(t)?true:false;e.onWindowLoaded(0)},init:function(e,t){if(typeof e!="string"){return-3}e=e.toLowerCase().replace(/\s/g,"");var n=this,r;if(typeof n[e]=="undefined"){return-3}r=n[e];n.plugin=r;if(typeof r.installed=="undefined"||t==true){r.installed=null;r.version=null;r.version0=null;r.getVersionDone=null;r.$=n}n.garbage=false;if(n.isIE&&!n.ActiveXEnabled){if(n.plugin!=n.java){return-2}}return 1},isMinVersion:function(e,t,n,r){return-3},getVersion:function(e,t,n){var r=BrowserInspect,i=r.init(e),s;if(i<0){return null}s=r.plugin;if(s.getVersionDone!=1){s.getVersion(t,n);if(s.getVersionDone===null){s.getVersionDone=1}}r.cleanup();return s.version||s.version0;return null},getInfo:function(e,t,n){var r={};var i=BrowserInspect,s=i.init(e),o;if(s<0){return r}o=i.plugin;if(typeof o.getInfo!="undefined"){if(o.getVersionDone===null){i.getVersion(e,t,n)}r=o.getInfo()}return r},cleanup:function(){var e=this;if(e.garbage&&typeof window.CollectGarbage!="undefined"){window.CollectGarbage()}},isActiveXObject:function(e){var t=this,n,r,i="/",s='<object width="1" height="1" style="display:none" '+t.plugin.getCodeBaseVersion(e)+">"+t.plugin.HTML+"<"+i+"object>";if(t.head.firstChild){t.head.insertBefore(document.createElement("object"),t.head.firstChild)}else{t.head.appendChild(document.createElement("object"))}t.head.firstChild.outerHTML=s;try{t.head.firstChild.classid=t.plugin.classID}catch(r){}n=false;try{if(t.head.firstChild.object){n=true}}catch(r){}try{if(n&&t.head.firstChild.readyState<4){t.garbage=true}}catch(r){}t.head.removeChild(t.head.firstChild);return n},codebaseSearch:function(e){var t=this;if(!t.ActiveXEnabled){return null}if(typeof e!="undefined"){return t.isActiveXObject(e)}var n=[0,0,0,0],r,i,s=t.plugin.digits,o=function(e,r){var i=(e==0?r:n[0])+","+(e==1?r:n[1])+","+(e==2?r:n[2])+","+(e==3?r:n[3]);return t.isActiveXObject(i)};var u,a,f=false;for(r=0;r<s.length;r++){u=s[r]*2;n[r]=0;for(i=0;i<20;i++){if(u==1&&r>0&&f){break}if(u-n[r]>1){a=Math.round((u+n[r])/2);if(o(r,a)){n[r]=a;f=true}else{u=a}}else{if(u-n[r]==1){u--;if(!f&&o(r,u)){f=true}break}else{if(!f&&o(r,u)){f=true}break}}}if(!f){return null}}return n.join(",")},dummy1:0}}BrowserInspect.onDetectionDone=function(e,t,n,r){return-1};BrowserInspect.onWindowLoaded=function(e){var t=BrowserInspect,n=window;if(t.EventWinLoad===true){}else{t.winLoaded=false;t.EventWinLoad=true;if(typeof n.addEventListener!="undefined"){n.addEventListener("load",t.runFuncs,false)}else{if(typeof n.attachEvent!="undefined"){n.attachEvent("onload",t.runFuncs)}else{if(typeof n.onload=="function"){t.funcs[t.funcs.length]=n.onload}n.onload=t.runFuncs}}}if(typeof e=="function"){t.funcs[t.funcs.length]=e}};BrowserInspect.funcs=[0];BrowserInspect.runFuncs=function(){var e=BrowserInspect,t;e.winLoaded=true;for(t=0;t<e.funcs.length;t++){if(typeof e.funcs[t]=="function"){e.funcs[t](e);e.funcs[t]=null}}};BrowserInspect.quicktime={mimeType:["video/quicktime","application/x-quicktimeplayer","image/x-macpaint","image/x-quicktime"],progID:"QuickTimeCheckObject.QuickTimeCheck.1",progID0:"QuickTime.QuickTime",classID:"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",minIEver:7,HTML:'<param name="src" value="A14999.mov" /><param name="controller" value="false" />',getCodeBaseVersion:function(e){return'codebase="#version='+e+'"'},digits:[8,64,16,0],clipTo3digits:function(e){if(e===null||typeof e=="undefined"){return null}var t,n,r,i=this.$;t=e.split(",");if(i.compareNums(e,"7,60,0,0")<0&&i.compareNums(e,"7,50,0,0")>=0){n=t[0]+","+t[1].charAt(0)+","+t[1].charAt(1)+","+t[2]}else{n=t[0]+","+t[1]+","+t[2]+","+t[3]}r=n.split(",");return r[0]+","+r[1]+","+r[2]+",0"},getVersion:function(){var e=null,t,n=this.$,r=true;if(!n.isIE){if(navigator.platform&&/linux/i.test(navigator.platform)){r=false}if(r){t=n.findNavPlugin(["QuickTime","(Plug-in|Plugin)"]);if(t&&t.name&&n.hasMimeType(this.mimeType)){e=n.getNum(t.name)}}this.installed=e?1:-1}else{var i;if(n.IEver>=this.minIEver&&n.getAXO(this.progID0,1)){e=n.codebaseSearch()}else{i=n.getAXO(this.progID);if(i&&i.QuickTimeVersion){e=i.QuickTimeVersion.toString(16);e=e.charAt(0)+"."+e.charAt(1)+"."+e.charAt(2)}}this.installed=e?1:n.getAXO(this.progID0,1)?0:-1}this.version=this.clipTo3digits(n.formatNum(e))}};BrowserInspect.java={mimeType:"application/x-java-applet",classID:"clsid:8AD9C840-044E-11D1-B3E9-00805F499D93",DTKclassID:"clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA",DTKmimeType:"application/npruntime-scriptable-plugin;DeploymentToolkit",JavaVersions:[[1,9,2,25],[1,8,2,25],[1,7,2,25],[1,6,2,25],[1,5,2,25],[1,4,2,25],[1,3,1,25]],searchJavaPluginAXO:function(){var e=null,t=this,n=t.$,r=[],i=[1,5,0,14],s=[1,6,0,2],o=[1,3,1,0],u=[1,4,2,0],a=[1,5,0,7],f=false;if(!n.ActiveXEnabled){return null}f=true;if(n.IEver>=t.minIEver){r=t.searchJavaAXO(s,s,f);if(r.length>0&&f){r=t.searchJavaAXO(i,i,f)}}else{if(f){r=t.searchJavaAXO(a,a,true)}if(r.length==0){r=t.searchJavaAXO(o,u,false)}}if(r.length>0){e=r[0]}t.JavaPlugin_versions=[].concat(r);return e},searchJavaAXO:function(e,t,n){var r,i,s=this.$,o,u,a,f,l,c,h,p=[];if(s.compareNums(e.join(","),t.join(","))>0){t=e}t=s.formatNum(t.join(","));var d,v="1,4,2,0",m="JavaPlugin."+e[0]+""+e[1]+""+e[2]+""+(e[3]>0?"_"+(e[3]<10?"0":"")+e[3]:"");for(r=0;r<this.JavaVersions.length;r++){i=this.JavaVersions[r];o="JavaPlugin."+i[0]+""+i[1];l=i[0]+"."+i[1]+".";for(a=i[2];a>=0;a--){h="JavaWebStart.isInstalled."+l+a+".0";if(s.compareNums(i[0]+","+i[1]+","+a+",0",t)>=0&&!s.getAXO(h,1)){continue}d=s.compareNums(i[0]+","+i[1]+","+a+",0",v)<0?true:false;for(f=i[3];f>=0;f--){u=a+"_"+(f<10?"0"+f:f);c=o+u;if(s.getAXO(c,1)&&(d||s.getAXO(h,1))){p[p.length]=l+u;if(!n){return p}}if(c==m){return p}}if(s.getAXO(o+a,1)&&(d||s.getAXO(h,1))){p[p.length]=l+a;if(!n){return p}}if(o+a==m){return p}}}return p},minIEver:7,getFromMimeType:function(e){var t,n,r=this.$,i=new RegExp(e),s,o,u={},a=0,f,l=[""];for(t=0;t<navigator.mimeTypes.length;t++){o=navigator.mimeTypes[t];if(i.test(o.type)&&o.enabledPlugin){o=o.type.substring(o.type.indexOf("=")+1,o.type.length);s="a"+r.formatNum(o);if(typeof u[s]=="undefined"){u[s]=o;a++}}}for(n=0;n<a;n++){f="0,0,0,0";for(t in u){if(u[t]){s=t.substring(1,t.length);if(r.compareNums(s,f)>0){f=s}}}l[n]=u["a"+f];u["a"+f]=null}if(!/windows|macintosh/i.test(navigator.userAgent)){l=[l[0]]}return l},queryJavaHandler:function(){var e=BrowserInspect.java,t=window.java,n;e.hasRun=true;try{if(typeof t.lang!="undefined"&&typeof t.lang.System!="undefined"){e.value=[t.lang.System.getProperty("java.version")+" ",t.lang.System.getProperty("java.vendor")+" "]}}catch(n){}},queryJava:function(){var e=this,t=e.$,n=navigator.userAgent,r;if(typeof window.java!="undefined"&&navigator.javaEnabled()&&!e.hasRun){if(t.isGecko){if(t.hasMimeType("application/x-java-vm")){try{var i=document.createElement("div"),s=document.createEvent("HTMLEvents");s.initEvent("focus",false,true);i.addEventListener("focus",e.queryJavaHandler,false);i.dispatchEvent(s)}catch(r){}if(!e.hasRun){e.queryJavaHandler()}}}else{if(/opera.9\.(0|1)/i.test(n)&&/mac/i.test(n)){}else{if(!e.hasRun){e.queryJavaHandler()}}}}return e.value},forceVerifyTag:[],jar:[],VENDORS:["Sun Microsystems Inc.","Apple Computer, Inc."],init:function(){var e=this,t=e.$;if(typeof e.app!="undefined"){e.delJavaApplets(t)}e.hasRun=false;e.value=[null,null];e.useTag=[2,2,2];e.app=[0,0,0,0,0,0];e.appi=3;e.queryDTKresult=null;e.OTF=0;e.BridgeResult=[[null,null],[null,null],[null,null]];e.JavaActive=[0,0,0];e.All_versions=[];e.DeployTK_versions=[];e.MimeType_versions=[];e.JavaPlugin_versions=[];e.funcs=[];var n=e.NOTF;if(n){n.$=t;if(n.javaInterval){clearInterval(n.javaInterval)}n.EventJavaReady=null;n.javaInterval=null;n.count=0;n.intervalLength=250;n.countMax=40}e.lateDetection=t.winLoaded;if(!e.lateDetection){t.onWindowLoaded(e.delJavaApplets)}},getVersion:function(e,t){var n,r=this,i=r.$,s=null,o=null,u=null,a=navigator.javaEnabled();if(r.getVersionDone===null){r.init()}var f;if(typeof t!="undefined"&&t.constructor==Array){for(f=0;f<r.useTag.length;f++){if(typeof t[f]=="number"){r.useTag[f]=t[f]}}}for(f=0;f<r.forceVerifyTag.length;f++){r.useTag[f]=r.forceVerifyTag[f]}if(typeof e!="undefined"){r.jar[r.jar.length]=e}if(r.getVersionDone==0){if(!r.version||r.useAnyTag()){n=r.queryExternalApplet(e);if(n[0]){u=n[0];o=n[1]}}r.EndGetVersion(u,o);return}var l=r.queryDeploymentToolKit();if(typeof l=="string"&&l.length>0){s=l;o=r.VENDORS[0]}if(!i.isIE){var c,h,p,d,v;v=i.hasMimeType(r.mimeType);d=v&&a?true:false;if(r.MimeType_versions.length==0&&v){n=r.getFromMimeType("application/x-java-applet.*jpi-version.*=");if(n[0]!=""){if(!s){s=n[0]}r.MimeType_versions=n}}if(!s&&v){n="Java[^\\d]*Plug-in";p=i.findNavPlugin(n);if(p){n=new RegExp(n,"i");c=n.test(p.description)?i.getNum(p.description):null;h=n.test(p.name)?i.getNum(p.name):null;if(c&&h){s=i.compareNums(i.formatNum(c),i.formatNum(h))>=0?c:h}else{s=c||h}}}if(!s&&v&&/macintosh.*safari/i.test(navigator.userAgent)){p=i.findNavPlugin("Java.*\\d.*Plug-in.*Cocoa",false);if(p){c=i.getNum(p.description);if(c){s=c}}}if(s){r.version0=s;if(a){u=s}}if(!u||r.useAnyTag()){p=r.queryExternalApplet(e);if(p[0]){u=p[0];o=p[1]}}if(!u){p=r.queryJava();if(p[0]){r.version0=p[0];u=p[0];o=p[1];if(r.installed==-.5){r.installed=.5}}}if(r.installed===null&&!u&&d&&!/macintosh.*ppc/i.test(navigator.userAgent)){n=r.getFromMimeType("application/x-java-applet.*version.*=");if(n[0]!=""){u=n[0]}}if(!u&&d){if(/macintosh.*safari/i.test(navigator.userAgent)){if(r.installed===null){r.installed=0}else{if(r.installed==-.5){r.installed=.5}}}}}else{if(!s&&l!=-1){s=r.searchJavaPluginAXO();if(s){o=r.VENDORS[0]}}if(!s){r.JavaFix()}if(s){r.version0=s;if(a&&i.ActiveXEnabled){u=s}}if(!u||r.useAnyTag()){n=r.queryExternalApplet(e);if(n[0]){u=n[0];o=n[1]}}}if(r.installed===null){r.installed=u?1:s?-.2:-1}r.EndGetVersion(u,o)},EndGetVersion:function(e,t){var n=this,r=n.$;if(n.version0){n.version0=r.formatNum(r.getNum(n.version0))}if(e){n.version=r.formatNum(r.getNum(e));n.vendor=typeof t=="string"?t:""}if(n.getVersionDone!=1){n.getVersionDone=0}},queryDeploymentToolKit:function(){var e=this,t=e.$,n,r,i=null,s=null;if(t.isGecko&&t.compareNums(t.GeckoRV,t.formatNum("1.6"))<=0||t.isSafari||t.isIE&&!t.ActiveXEnabled){e.queryDTKresult=0}if(e.queryDTKresult!==null){return e.queryDTKresult}if(t.isIE&&t.IEver>=6){e.app[0]=t.instantiate("object",[],[]);i=t.getObject(e.app[0])}else{if(!t.isIE&&t.hasMimeType(e.DTKmimeType)){e.app[0]=t.instantiate("object",["type",e.DTKmimeType],[]);i=t.getObject(e.app[0])}}if(i){if(t.isIE&&t.IEver>=6){try{i.classid=e.DTKclassID}catch(n){}}try{var o,u=i.jvms;if(u){s=u.getLength();if(typeof s=="number"){for(r=0;r<s;r++){o=u.get(s-1-r);if(o){o=o.version;if(t.getNum(o)){e.DeployTK_versions[r]=o}}}}}}catch(n){}}t.hideObject(i);e.queryDTKresult=e.DeployTK_versions.length>0?e.DeployTK_versions[0]:s==0?-1:0;return e.queryDTKresult},queryExternalApplet:function(e){var t=this,n=t.$,r=t.BridgeResult,i=t.app,s=t.appi,o="&nbsp;&nbsp;&nbsp;&nbsp;";if(typeof e!="string"||!/\.jar\s*$/.test(e)){return[null,null]}if(t.OTF<1){t.OTF=1}if(!n.isIE){if((n.isGecko||n.isChrome)&&!n.hasMimeType(t.mimeType)&&!t.queryJava()[0]){return[null,null]}}if(t.OTF<2){t.OTF=2}if(!i[s]&&t.canUseObjectTag()&&t.canUseThisTag(0)){i[1]=n.instantiate("object",[],[],o);i[s]=n.isIE?n.instantiate("object",["archive",e,"code","A.class","type",t.mimeType],["archive",e,"code","A.class","mayscript","true","scriptable","true"],o):n.instantiate("object",["archive",e,"classid","java:A.class","type",t.mimeType],["archive",e,"mayscript","true","scriptable","true"],o);r[0]=[0,0];t.query1Applet(s)}if(!i[s+1]&&t.canUseAppletTag()&&t.canUseThisTag(1)){i[s+1]=n.instantiate("applet",["archive",e,"code","A.class","alt",o,"mayscript","true"],["mayscript","true"],o);r[1]=[0,0];t.query1Applet(s+1)}if(n.isIE&&!i[s+2]&&t.canUseObjectTag()&&t.canUseThisTag(2)){i[s+2]=n.instantiate("object",["classid",t.classID],["archive",e,"code","A.class","mayscript","true","scriptable","true"],o);r[2]=[0,0];t.query1Applet(s+2)}var u,a=0;for(u=0;u<r.length;u++){if(i[s+u]||t.canUseThisTag(u)){a++}else{break}}if(a==r.length){t.getVersionDone=1;if(t.forceVerifyTag.length>0){t.getVersionDone=0}}return t.getBR()},canUseAppletTag:function(){return!this.$.isIE||navigator.javaEnabled()?true:false},canUseObjectTag:function(){return!this.$.isIE||this.$.ActiveXEnabled?true:false},useAnyTag:function(){var e=this,t;for(t=0;t<e.useTag.length;t++){if(e.canUseThisTag(t)){return true}}return false},canUseThisTag:function(e){var t=this,n=t.$;if(t.useTag[e]==3){return true}if(!t.version0||!navigator.javaEnabled()||n.isIE&&!n.ActiveXEnabled){if(t.useTag[e]==2){return true}if(t.useTag[e]==1&&!t.getBR()[0]){return true}}return false},getBR:function(){var e=this.BridgeResult,t;for(t=0;t<e.length;t++){if(e[t][0]){return[e[t][0],e[t][1]]}}return[e[0][0],e[0][1]]},delJavaApplets:function(e){var t=e.java.app,n;for(n=t.length-1;n>=0;n--){e.uninstantiate(t[n])}},query1Applet:function(e){var t,n=this,r=n.$,i=null,s=null,o=r.getObject(n.app[e],true);try{if(o){i=o.getVersion()+" ";s=o.getVendor()+" ";if(r.num(i)){n.BridgeResult[e-n.appi]=[i,s];r.hideObject(n.app[e])}if(r.isIE&&i&&o.readyState!=4){r.garbage=true;r.uninstantiate(n.app[e])}}}catch(t){}},NOTF:{isJavaActive:function(){}},append:function(e,t){for(var n=0;n<t.length;n++){e[e.length]=t[n]}},getInfo:function(){var e={};var t=this,n=t.$,r,i=t.installed;e={All_versions:[],DeployTK_versions:[],MimeType_versions:[],DeploymentToolkitPlugin:t.queryDTKresult==0?false:true,vendor:typeof t.vendor=="string"?t.vendor:"",OTF:t.OTF<3?0:t.OTF==3?1:2};var s=[null,null,null];for(r=0;r<t.BridgeResult.length;r++){s[r]=t.BridgeResult[r][0]?1:t.JavaActive[r]==1?0:t.useTag[r]>=1&&t.OTF>=1&&t.OTF!=3&&!(r==2&&!n.isIE)&&(t.BridgeResult[r][0]!==null||r==1&&!t.canUseAppletTag()||r!=1&&!t.canUseObjectTag()||i==-.2||i==-1)?-1:null}e.objectTag=s[0];e.appletTag=s[1];e.objectTagActiveX=s[2];var o=e.All_versions,u=e.DeployTK_versions,a=e.MimeType_versions,f=t.JavaPlugin_versions;t.append(u,t.DeployTK_versions);t.append(a,t.MimeType_versions);t.append(o,u.length>0?u:a.length>0?a:f.length>0?f:typeof t.version=="string"?[t.version]:[]);for(r=0;r<o.length;r++){o[r]=n.formatNum(n.getNum(o[r]))}var l,c=null;if(!n.isIE){l=a.length>0?n.hasMimeType(t.mimeType+";jpi-version="+a[0]):n.hasMimeType(t.mimeType);if(l){c=l.enabledPlugin}}e.name=c?c.name:"";e.description=c?c.description:"";var h=null;if((i==0||i==1)&&e.vendor==""){if(/macintosh/i.test(navigator.userAgent)){h=t.VENDORS[1]}else{if(!n.isIE&&/windows/i.test(navigator.userAgent)){h=t.VENDORS[0]}else{if(/linux/i.test(navigator.userAgent)){h=t.VENDORS[0]}}}if(h){e.vendor=h}}return e},JavaFix:function(){}};BrowserInspect.devalvr={mimeType:"application/x-devalvrx",progID:"DevalVRXCtrl.DevalVRXCtrl.1",classID:"clsid:5D2CF9D0-113A-476B-986F-288B54571614",getVersion:function(){var e=null,t,n=this.$,r;if(!n.isIE){t=n.findNavPlugin("DevalVR");if(t&&t.name&&n.hasMimeType(this.mimeType)){e=t.description.split(" ")[3]}this.installed=e?1:-1}else{var i,s,o;s=n.getAXO(this.progID,1);if(s){i=n.instantiate("object",["classid",this.classID],["src",""]);o=n.getObject(i);if(o){try{if(o.pluginversion){e="00000000"+o.pluginversion.toString(16);e=e.substr(e.length-8,8);e=parseInt(e.substr(0,2),16)+","+parseInt(e.substr(2,2),16)+","+parseInt(e.substr(4,2),16)+","+parseInt(e.substr(6,2),16)}}catch(r){}}n.uninstantiate(i)}this.installed=e?1:s?0:-1}this.version=n.formatNum(e)}};BrowserInspect.flash={mimeType:["application/x-shockwave-flash","application/futuresplash"],progID:"ShockwaveFlash.ShockwaveFlash",classID:"clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",getVersion:function(){var e=function(e){if(!e){return null}var t=/[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(e);return t?t[0].replace(/[rRdD\.]/g,",").replace(/\s/g,""):null};var t,n=this.$,r,i,s=null,o=null,u=null;if(!n.isIE){t=n.findNavPlugin("Flash");if(t&&t.description&&n.hasMimeType(this.mimeType)){s=e(t.description)}}else{for(i=15;i>2;i--){o=n.getAXO(this.progID+"."+i);if(o){u=i.toString();break}}if(u=="6"){try{o.AllowScriptAccess="always"}catch(r){return"6,0,21,0"}}try{s=e(o.GetVariable("$version"))}catch(r){}if(!s&&u){s=u}}this.installed=s?1:-1;this.version=n.formatNum(s);return true}};BrowserInspect.shockwave={mimeType:"application/x-director",progID:"SWCtl.SWCtl",classID:"clsid:166B1BCA-3F9C-11CF-8075-444553540000",getVersion:function(){var e=null,t=null,n,r,i=this.$;if(!i.isIE){r=i.findNavPlugin("Shockwave for Director");if(r&&r.description&&i.hasMimeType(this.mimeType)){e=i.getNum(r.description)}}else{try{t=i.getAXO(this.progID).ShockwaveVersion("")}catch(n){}if(typeof t=="string"&&t.length>0){e=i.getNum(t)}else{if(i.getAXO(this.progID+".8",1)){e="8"}else{if(i.getAXO(this.progID+".7",1)){e="7"}else{if(i.getAXO(this.progID+".1",1)){e="6"}}}}}this.installed=e?1:-1;this.version=i.formatNum(e)}};BrowserInspect.div=null;BrowserInspect.pluginSize=1;BrowserInspect.DOMbody=null;BrowserInspect.uninstantiate=function(e){var t,n=this;if(!e){return}try{if(e[0]&&e[0].firstChild){e[0].removeChild(e[0].firstChild)}if(e[0]&&n.div){n.div.removeChild(e[0])}if(n.div&&n.div.childNodes.length==0){n.div.parentNode.removeChild(n.div);n.div=null;if(n.DOMbody&&n.DOMbody.parentNode){n.DOMbody.parentNode.removeChild(n.DOMbody)}n.DOMbody=null}e[0]=null}catch(t){}};BrowserInspect.getObject=function(e,t){var n,r=this,i=null;try{if(e&&e[0]&&e[0].firstChild){i=e[0].firstChild}}catch(n){}try{if(t&&i&&typeof i.focus!="undefined"&&typeof document.hasFocus!="undefined"&&!document.hasFocus()){i.focus()}}catch(n){}return i};BrowserInspect.getContainer=function(e){var t,n=null;if(e&&e[0]){n=e[0]}return n};BrowserInspect.hideObject=function(e){var t=this.getObject(e);if(t&&t.style){t.style.height="0"}};BrowserInspect.instantiate=function(e,t,n,r){var i=function(e){var t=e.style;if(!t){return}t.border="0px";t.padding="0px";t.margin="0px";t.fontSize=u.pluginSize+3+"px";t.height=u.pluginSize+3+"px";t.visibility="visible";if(e.tagName&&e.tagName.toLowerCase()=="div"){t.width="100%";t.display="block"}else{if(e.tagName&&e.tagName.toLowerCase()=="span"){t.width=u.pluginSize+"px";t.display="inline"}}};var s,o=document,u=this,a,f=o.getElementsByTagName("body")[0]||o.body,l=o.createElement("span"),c,h,p="/";if(typeof r=="undefined"){r=""}a="<"+e+' width="'+u.pluginSize+'" height="'+u.pluginSize+'" ';for(c=0;c<t.length;c=c+2){a+=t[c]+'="'+t[c+1]+'" '}a+=">";for(c=0;c<n.length;c=c+2){a+='<param name="'+n[c]+'" value="'+n[c+1]+'" />'}a+=r+"<"+p+e+">";if(!u.div){u.div=o.createElement("div");h=o.getElementById("BrowserInspect");if(h){i(h);h.appendChild(u.div)}else{if(f){try{if(f.firstChild&&typeof f.insertBefore!="undefined"){f.insertBefore(u.div,f.firstChild)}else{f.appendChild(u.div)}}catch(s){}}else{try{o.write('<div id="pd33993399">o<'+p+"div>");f=o.getElementsByTagName("body")[0]||o.body;f.appendChild(u.div);f.removeChild(o.getElementById("pd33993399"))}catch(s){try{u.DOMbody=o.createElement("body");o.getElementsByTagName("html")[0].appendChild(u.DOMbody);u.DOMbody.appendChild(u.div)}catch(s){}}}}i(u.div)}if(u.div&&u.div.parentNode&&u.div.parentNode.parentNode){u.div.appendChild(l);try{l.innerHTML=a}catch(s){}i(l);return[l]}return[null]};BrowserInspect.windowsmediaplayer={mimeType:["application/x-mplayer2","application/asx"],progID:"wmplayer.ocx",classID:"clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6",getVersion:function(){var e=null,t=this.$,n=null;this.installed=-1;if(!t.isIE){if(t.hasMimeType(this.mimeType)){if(t.findNavPlugin(["Windows","Media","(Plug-in|Plugin)"],false)||t.findNavPlugin(["Flip4Mac","Windows","Media"],false)){this.installed=0}var r=t.isGecko&&t.compareNums(t.GeckoRV,t.formatNum("1.8"))<0;if(!r&&t.findNavPlugin(["Windows","Media","Firefox Plugin"],false)){var i=t.instantiate("object",["type",this.mimeType[0]],[]),s=t.getObject(i);if(s){e=s.versionInfo}t.uninstantiate(i)}}}else{n=t.getAXO(this.progID);if(n){e=n.versionInfo}}if(e){this.installed=1}this.version=t.formatNum(e)}};BrowserInspect.silverlight={mimeType:"application/x-silverlight",progID:"AgControl.AgControl",digits:[9,20,9,12,31],getVersion:function(){var e=this.$,t=document,n=null,r=null,i=false;if(!e.isIE){var s=[null,null],o=e.findNavPlugin("Silverlight Plug-in",false),u=e.isGecko&&e.compareNums(e.GeckoRV,e.formatNum("1.6"))<=0;if(o&&e.hasMimeType(this.mimeType)){n=e.formatNum(o.description);if(n){a=n.split(",");if(parseInt(a[2],10)>=30226&&parseInt(a[0],10)<2){a[0]="2"}n=a.join(",")}if(e.isGecko&&!u){i=true}if(!i&&!u&&n){s=e.instantiate("object",["type",this.mimeType],[]);r=e.getObject(s);if(r){if(typeof r.IsVersionSupported!="undefined"){i=true}if(!i){r.data="data:"+this.mimeType+",";if(typeof r.IsVersionSupported!="undefined"){i=true}}}e.uninstantiate(s)}}}else{r=e.getAXO(this.progID);var a=[1,0,1,1,1],f,l,c,h=function(e){return(e<10?"0":"")+e.toString()},p=function(e,t,n,r,i){return e+"."+t+"."+n+h(r)+h(i)+".0"},d=function(e,t){var n,i=p(e==0?t:a[0],e==1?t:a[1],e==2?t:a[2],e==3?t:a[3],e==4?t:a[4]);try{return r.IsVersionSupported(i)}catch(n){}return false};if(r&&typeof r.IsVersionSupported!="undefined"){for(f=0;f<this.digits.length;f++){c=a[f];for(l=c+(f==0?0:1);l<=this.digits[f];l++){if(d(f,l)){i=true;a[f]=l}else{break}}if(!i){break}}if(i){n=p(a[0],a[1],a[2],a[3],a[4])}}}this.installed=i?1:-1;this.version=e.formatNum(n)}};BrowserInspect.vlc={mimeType:"application/x-vlc-plugin",progID:"VideoLAN.VLCPlugin",compareNums:function(e,t){var n=e.split(","),r=t.split(","),i,s,o,u,a,f;for(i=0;i<Math.min(n.length,r.length);i++){f=/([\d]+)([a-z]?)/.test(n[i]);s=parseInt(RegExp.$1,10);u=i==2&&RegExp.$2.length>0?RegExp.$2.charCodeAt(0):-1;f=/([\d]+)([a-z]?)/.test(r[i]);o=parseInt(RegExp.$1,10);a=i==2&&RegExp.$2.length>0?RegExp.$2.charCodeAt(0):-1;if(s!=o){return s>o?1:-1}if(i==2&&u!=a){return u>a?1:-1}}return 0},getVersion:function(){var e=this.$,t,n=null,r;if(!e.isIE){if(e.hasMimeType(this.mimeType)){t=e.findNavPlugin(["VLC","(Plug-in|Plugin)"],false);if(t&&t.description){n=e.getNum(t.description,"[\\d][\\d\\.]*[a-z]*")}}this.installed=n?1:-1}else{t=e.getAXO(this.progID);if(t){try{n=e.getNum(t.VersionInfo,"[\\d][\\d\\.]*[a-z]*")}catch(r){}}this.installed=t?1:-1}this.version=e.formatNum(n)}};BrowserInspect.initScript();

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
                    }

                    for(var plugin in default_plugins){
                        var version = BrowserInspect.getVersion(plugin);
                        if(version){
                            plugin = plugin + " " + version;
                            plugins.push(plugin);
                        }
                    }

                    var acrobat = ieAcrobatVersion();
                    if(acrobat){
                        plugins.push(acrobat)
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
                if ("" == fonts)
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

            details["language"] = get_language();
            fingerprint.push(details["language"]);
            try{
                var ua = navigator.userAgent;
                details["user_agent"] = ua;
                fingerprint.push(ua);
            }catch(ex){
                //permission denied
                details["user_agent"] = "n/a";
            }

            try {
                var plugins = identify_plugins();
                details["plugins"] = plugins;
                fingerprint.push(plugins.join("|"));
            } catch(ex) {
                //permission denied;
                details["plugins"] = "n/a";
            }

            try {
                var fonts = get_fonts();
                details["fonts"] = fonts;
                fingerprint.push(fonts);
            } catch(ex) {
                //permission denied;
                details["fonts"] = "n/a";
            }

            try {
                var tz = new Date().getTimezoneOffset();
                details['timezone'] = tz;
                fingerprint.push(tz);
            } catch(ex) {
                //permission denied;
                details["timezone"] = "n/a";
            }

            try {
                var video = screen.width+"x"+screen.height+"x"+screen.colorDepth;
                details['video'] = video;
                fingerprint.push(video);
            } catch(ex) {
                //permission denied;
                details["video"] = "n/a";
            }

            try {
                var supercookies = test_dom_storage() + test_ie_userdata();
                details['supercookies'] = supercookies;
                fingerprint.push(supercookies);
            } catch(ex) {
                //permission denied;
                details["supercookies"] = "n/a";
            }

            var fp = fingerprint.join("|");
            var hash = md5.hash(fp);
            details["fingerprint"] = hash;
            return details;
        },
        track: function(force){
            var cookie_name = "x_browser_fingerprint";
            if(browserCookies.get(cookie_name) !== null){
                if(force != true){
                    return;
                }
            }

            var details = browser.details();
            var fingerprint = details["fingerprint"];
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
                if(part.indexOf(key) == 0){
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
            var c = c1 = c2 = 0;
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



