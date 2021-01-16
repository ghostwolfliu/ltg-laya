!function(e){var t={};function i(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(s,o,function(t){return e[t]}.bind(null,o));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=12)}([function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.NotExist=0]="NotExist",e[e.Dir=1]="Dir",e[e.File=2]="File"}(t.EFileType||(t.EFileType={}))},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{static ReplaceAll(e,t,i){for(;e.indexOf(t)>=0;)e=e.replace(t,i);return e}static IsNullOrEmpty(e){return null==e||""==e}}},function(e,t){e.exports=require("process")},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(1),o=i(0),n=i(6),r=i(7),l=i(2),c=i(3);class a{static CompressJs(e,t){let i=s.statSync(e),r=o.win32.basename(e),l=s.readFileSync(e,{encoding:"utf-8"}),c=n.minify(l);if(c.error)throw console.error("压缩文件",r,"出错",c.error),SyntaxError("文件压缩失败,中断发包");this.WriteStrTo(t,c.code);let a=s.statSync(t),u=i.size/1024,y=a.size/1024,f=y/u,p="("+(100*f).toFixed(2)+"%)";return console.log("压缩",r.green,u.toFixed(2)+"Kb >>>>>>>> "+y.toFixed(2)+"Kb "+(f>1?p.red:p.green)),c.code}static WrapToES5(e){let t=r.execSync("babel ");console.log(t)}static ReplaceAll(e,t,i){let s=e;if(t==i)return s;for(;s.indexOf(t)>=0;)s=s.replace(t,i);return s}static MakeDirExist(e){let t=null;return s.existsSync(e)&&(t=s.statSync(e)),!(!t||!t.isDirectory())||(s.mkdirSync(e,{recursive:!0}),!(!s.existsSync(e)||!s.statSync(e).isDirectory()))}static IsFileOrDir(e){if(!s.existsSync(e))return l.EFileType.NotExist;return s.statSync(e).isFile()?l.EFileType.File:l.EFileType.Dir}static DeleteDir(e){let t=[];if(s.existsSync(e)){t=s.readdirSync(e);for(let i=0;i<t.length;++i){let n=t[i],r=o.join(e,n);s.statSync(r).isDirectory()?this.DeleteDir(r):s.unlinkSync(r)}s.rmdirSync(e)}}static CopyFile(e,t){let i=t.lastIndexOf("\\"),o=t.substring(0,i);a.MakeDirExist(o),s.copyFileSync(e,t)}static CopyDir(e,t,i=null){this.MakeDirExist(t);let n=s.readdirSync(e);for(let r=0;r<n.length;++r){let l=n[r],c=o.join(t,l);if(i&&!i(l,c))continue;let a=o.join(e,l);s.statSync(a).isDirectory()?this.CopyDir(a,c,i):s.copyFileSync(a,c)}}static ReadStrFrom(e){if(!a.IsFileExist(e))return null;return s.statSync(e).isDirectory()?null:s.readFileSync(e,{encoding:"utf-8"})}static IsFileExist(e){return s.existsSync(e)}static GetDirName(e){let t=this.IsFileOrDir(e);if(t==l.EFileType.NotExist)return"";let i=(e=c.default.ReplaceAll(e,"\\","/")).split("/");return e.endsWith("/")||t==l.EFileType.File?i[i.length-2]:i[i.length-1]}static WriteStrTo(e,t){let i=e.lastIndexOf("\\"),o=e.substring(0,i);a.MakeDirExist(o),s.writeFileSync(e,t,{encoding:"utf-8"})}static Rename(e,t){s.renameSync(e,t)}}t.LTUtils=a},function(e,t){e.exports=require("uglify-es")},function(e,t){e.exports=require("child_process")},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class s{}t.default=s,s.needCopy=["src/LTGame","src/SDK","src/LTG_CommonUI","bin/res/ltgame","bin/libs","bin/index.js","libs",".vscode/launch.json","bin/game.js","bin/game.json","bin/index.html","tsconfig.json"],s.needCopyFGUI=["assets/Load","settings","p_yinyou.fairy"],s.needUpdateFGUI=["assets","settings","p_yinyou.fairy"],s.needCopyUnity=["Assets/Plugins","Assets/LayaAir3D","Assets/StreamingAssets","Assets/LTEditorData.asset","Packages","ProjectSettings"],s.initProject=["src/script/ui/UI_MainMediator.ts","src/script/common/GlobalUnit.ts","src/script/common/GameData.ts","src/script/common/ResDefine.ts","src/script/scene/MainScene.ts","src/script/scene/SplashScene.ts","src/script/config/PackConst.ts","src/script/config/GameConst.ts","src/script/config/AudioConfig.ts","src/script/config/EffectConfig.ts","src/script/manager/AudioManager.ts","src/script/manager/EffectManager.ts","src/script/MainStart.ts","src/Main.ts"],s.needCopyExcel=["game_const.xlsx","pack_const.xlsx","effect_config.xlsx","audio_config.xlsx","roll_config.xlsx","sign_config.xlsx","reward_code_config.xlsx","egg_config.xlsx"]},,,,function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0),o=i(4),n=i(8),r=i(5),l=i(2);new class{constructor(){let e=o.cwd();console.log("开始更新框架内容"),this._CopyLaya(e),this._CopyUnity(e),this._CopyFGUI(e),this._CopyExcel(e),console.log("更新框架完成")}_CopyFGUI(e){let t=r.LTUtils.GetDirName(e),i=s.join(e,"./../../fgui/"+t+"/");if(r.LTUtils.IsFileExist(i))return void console.log("fgui工程仅在创建第一次进行拷贝,已跳过");let o=s.join(e,"./others/publish/templates/_project/fgui/p_yinyou/");r.LTUtils.CopyDir(o,i),console.log("拷贝",o,"完成"),o=s.join(e,"./others/publish/templates/_project/fgui/p_common_ui/"),i=s.join(e,"./../../fgui/p_common_ui/"),r.LTUtils.CopyDir(o,i),console.log("拷贝",o,"完成");{let i=s.join(e,"./../../fgui/"+t+"/settings/Publish.json"),o=JSON.parse(r.LTUtils.ReadStrFrom(i));o.codeGeneration.codePath="..\\..\\laya\\"+t+"\\src\\ui",o.path="..\\..\\laya\\"+t+"\\bin\\res\\fgui";let n=JSON.stringify(o);r.LTUtils.WriteStrTo(i,n);let l=s.join(e,"./../../fgui/"+t+"/assets/Load/package.xml"),c="..\\..\\laya\\p_yinyou\\bin\\res\\fgui_load",a="..\\..\\laya\\"+t+"\\bin\\res\\fgui_load",u=r.LTUtils.ReadStrFrom(l);u=r.LTUtils.ReplaceAll(u,c,a),r.LTUtils.WriteStrTo(l,u);let y=s.join(e,"./../../fgui/"+t+"/p_yinyou.fairy"),f=s.join(e,"./../../fgui/"+t+"/"+t+".fairy");r.LTUtils.Rename(y,f)}{t="p_common_ui";let i=s.join(e,"./../../fgui/"+t+"/settings/Publish.json"),o=JSON.parse(r.LTUtils.ReadStrFrom(i));o.codeGeneration.codePath="..\\..\\laya\\"+t+"\\src\\LTG_CommonUI\\UI",o.path="..\\..\\laya\\"+t+"\\bin\\res\\ltgame\\ui";let n=JSON.stringify(o);r.LTUtils.WriteStrTo(i,n)}}_CopyUnity(e){let t=r.LTUtils.GetDirName(e),i=s.join(e,"./others/publish/templates/_project/unity"),o=s.join(e,"./../../unity/"+t+"/");for(let e of n.default.needCopyUnity){let t=s.join(i,e),n=r.LTUtils.IsFileOrDir(t);if(n==l.EFileType.NotExist){console.log(t,"不存在");continue}let c=s.join(o,e);if("Packages"!=e&&"ProjectSettings"!=e||!r.LTUtils.IsFileExist(c)){if(n==l.EFileType.File)r.LTUtils.CopyFile(t,c);else{let e=["Configuration.xml","LTEditorData.asset"];r.LTUtils.CopyDir(t,c,(function(t,i){return!(e.indexOf(i)>=0&&r.LTUtils.IsFileExist(i))||(console.log(t,"已存在,跳过拷贝"),!1)}))}console.log("拷贝",t,"完成")}else console.log(c,"已存在,跳过拷贝")}{let i=s.join(e,"./../../unity/"+t+"/Assets/LayaAir3D/LayaTool/Configuration.xml"),o="<SavePath>D:/Work_Projects/ltg-laya/FakeProject/code/laya/p_yinyou/bin/res</SavePath>",n="<SavePath>"+s.join(e,"./../../laya/"+t+"/bin/res")+"</SavePath>",l=r.LTUtils.ReadStrFrom(i);l=r.LTUtils.ReplaceAll(l,o,n),r.LTUtils.WriteStrTo(i,l);let c=s.join(e,"./../../unity/"+t+"/Assets/LTEditorData.asset"),a=["/../../../laya/p_yinyou/src/script/config/","/../../../laya/p_yinyou/bin/res/config/"],u=["/../../../laya/"+t+"/src/script/config/","/../../../laya/"+t+"/bin/res/config/"];l=r.LTUtils.ReadStrFrom(c);for(let e=0;e<a.length;++e){let t=a[e],i=u[e];l=r.LTUtils.ReplaceAll(l,t,i)}r.LTUtils.WriteStrTo(c,l)}}_CopyExcel(e){let t=s.join(e,"./others/publish/templates/_project/excel"),i=s.join(e,"./../../../design/excel/");for(let e of n.default.needCopyExcel){let o=s.join(t,e);if(r.LTUtils.IsFileOrDir(o)==l.EFileType.NotExist){console.log(o,"不存在");continue}let n=s.join(i,e);r.LTUtils.IsFileExist(n)||r.LTUtils.CopyFile(o,n),console.log("拷贝",o,"完成")}}_CopyLaya(e){let t=s.join(e,"./others/publish/templates/_project/laya"),i=e;for(let e of n.default.needCopy){let o=s.join(t,e),n=r.LTUtils.IsFileOrDir(o);if(n==l.EFileType.NotExist){console.log(o,"不存在");continue}let c=s.join(i,e);n==l.EFileType.File?"tsconfig.json"!=e?r.LTUtils.CopyFile(o,c):r.LTUtils.IsFileExist(c)||r.LTUtils.CopyFile(o,c):r.LTUtils.CopyDir(o,c),console.log("拷贝",o,"完成")}for(let e of n.default.initProject){let o=s.join(t,e);if(r.LTUtils.IsFileOrDir(o)==l.EFileType.NotExist){console.log(o,"不存在");continue}let n=s.join(i,e);r.LTUtils.IsFileExist(n)||r.LTUtils.CopyFile(o,n),console.log("拷贝",o,"完成")}}}}]);