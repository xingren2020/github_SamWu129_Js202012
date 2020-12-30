/*
更新时间: 2020-12-25 21:10
*/

//let s = 30000 //等待延迟30s
const $ = new Env("【cdsp_reward】")
const notify = $.isNode() ? require('./sendNotify') : '';
let URLArr = [], URL = "";
let EggBDArr = [], EggBD = "";
let PrizeBDArr = [], PrizeBD = "";
let TKArr = [], TK = "";
let TokenArr = [], Token = "";
let detail = ``;
let eggcoin = 0, prizecoin = 0;
let Account = ["【Sam】","【小爱豆】","【QF】","【RL】","【WYDSZ】","【月锡】"];
 if (process.env.CD_URL_REWARD && process.env.CD_URL_REWARD.indexOf('\n') > -1) {
  URL = process.env.CD_URL_REWARD.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  URL = process.env.CD_URL_REWARD.split()
  } 
  Object.keys(URL).forEach((item) => {
        if (URL[item]) {
          URLArr.push(URL[item])
        }
  })

 if (process.env.CD_BD_EGG && process.env.CD_BD_EGG.indexOf('\n') > -1) {
  EggBD = process.env.CD_BD_EGG.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  EggBD = process.env.CD_BD_EGG.split()
  } 
  Object.keys(EggBD).forEach((item) => {
        if (EggBD[item]) {
          EggBDArr.push(EggBD[item])
        }
  })
  
 if (process.env.CD_BD_PRIZE && process.env.CD_BD_PRIZE.indexOf('\n') > -1) {
  PrizeBD = process.env.CD_BD_PRIZE.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  PrizeBD = process.env.CD_BD_PRIZE.split()
  } 
  Object.keys(PrizeBD).forEach((item) => {
        if (PrizeBD[item]) {
          PrizeBDArr.push(PrizeBD[item])
        }
  })

  if (process.env.CD_TK && process.env.CD_TK.indexOf('\n') > -1) {
  TK = process.env.CD_TK.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  TK = process.env.CD_TK.split()
  } 
  Object.keys(TK).forEach((item) => {
        if (TK[item]) {
          TKArr.push(TK[item])
        }
  })

  if (process.env.CD_TOKEN && process.env.CD_TOKEN.indexOf('\n') > -1) {
  Token = process.env.CD_TOKEN.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  Token = process.env.CD_TOKEN.split()
  } 
  Object.keys(Token).forEach((item) => {
        if (Token[item]) {
          TokenArr.push(Token[item])
        }
  })




      console.log(`============ 共${TKArr.length}个账号  =============\n`)
      console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
      console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
!(async () => {
  if (!TKArr[0]) {
    console.log($.name, '【提示】请把TK填入Github 的 Secrets 中，请以回车隔开')
    return;
  }
       
   for (let i = 0; i < TKArr.length; i++) {
    if (TKArr[i]) {
      articleTK = TKArr[i];
      articleToken = TokenArr[i]; 
      account = Account[i];
     console.log(`【开启任务】开始执行账号${account}的任务`);
     detail = `【开启任务】开始执行账号${account}的任务；\n`;
   for (let j = 0; j < URLArr.length; j++) {
      articleURL = URLArr[j];
   if(j==0) await task();
   if(j==1) for (let m = 0; m < EggBDArr.length; m++) {
      articleBD = EggBDArr[m]; 
      console.log(`Egg[articleBD]:`+articleBD)
      //detail += `【Egg】开始执行任务；\n`;
      await egg();
      }
      console.log(`【Egg】获得${eggcoin}金币；`);
      detail += `【Egg】获得${eggcoin}金币；\n`;
      //notify.sendNotify($.name+'\n', detail)
   if(j==2) await prize();
     }
   await notify.sendNotify($.name+'\n', detail)
    }
   console.log(`⏱⏱⏱请等待3s后执行下一个账号任务⏱⏱⏱`);
   await $.wait(3000);    
   }  
     console.log(`🎉🎉🎉运行结束🎉🎉🎉`)
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

function task() {
    return new Promise((resolve, reject) => {
       let myrequest = {
            url: articleURL,
            headers: {
              "Content-Type": "application/json",
              "TK": articleTK,
              "Token": articleToken
            }
        };
        $.get(myrequest, async(error, response, data) => {
          try{
            console.log(`【task】任务完成；`);
            detail += `【task】任务完成；\n`;
            await $.wait(1000);
          }
           catch(error) {   
               let readres = JSON.parse(data);
               //console.log(readres)
              console.log(`本次任务出现异常，请等待1s后执行下一个任务。`)
              detail += `本次任务出现异常，请等待1s后执行下一个任务。\n`;
            await $.wait(1000);
            }
          resolve()
        })
    })
}


function egg() {
     return new Promise((resolve, reject) => {
       let myrequest = {
            url: articleURL,
            headers: {
              "Content-Type": "application/json",
              "TK": articleTK,
              "Token": articleToken
            },
            body: articleBD
        };
        $.post(myrequest, async(error, response, data) => {
          try{
           let readres = JSON.parse(data);
            console.log(readres)
           if (readres.code == '0' || readres.code == '422') {
            console.log(`【Egg】获得${readres.prize}金币；`);
            eggcoin += readres.prize
            await $.wait(1000);
            }
          }
           catch(error) {   
               let readres = JSON.parse(data);
               //console.log(readres)
              console.log(`本次任务出现异常，请等待1s后执行下一个任务。`)
              detail += `本次任务出现异常，请等待1s后执行下一个任务。\n`;
            await $.wait(1000);
            }
          resolve()
        })
    })
}

function prize() {
 detail += `【Prize】开始执行任务；\n`;
 for (let n = 0; n < PrizeBDArr.length; n++) {
      articleBD = PrizeBDArr[n]; 
      console.log(`Prize[articleBD]:`+articleBD)
    return new Promise((resolve, reject) => {
       let myrequest = {
            url: articleURL,
            headers: {
              "Content-Type": "application/json",
              "TK": articleTK,
              "Token": articleToken
            },
            body: articleBD
        };
        $.post(myrequest, async(error, response, data) => {
          try{
           let readres = JSON.parse(data);
            console.log(readres)
           if (readres.code == '0' || readres.code == '422') {
            console.log(`【Prize】获得${readres.data.reward_value}金币；`);
            prizecoin += readres.data.reward_value
            await $.wait(1000);
            }
          }
           catch(error) {   
               let readres = JSON.parse(data);
               //console.log(readres)
              console.log(`本次任务出现异常，请等待1s后执行下一个任务。`)
              detail += `本次任务出现异常，请等待1s后执行下一个任务。\n`;
            await $.wait(1000);
            }
          resolve()
        })
    })
  }
 detail += `【Prize】获得${prizecoin}金币；\n`;
// notify.sendNotify($.name+'\n', detail)
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
