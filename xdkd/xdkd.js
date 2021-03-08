/*
更新时间: 2020-12-25 21:10
*/

//let s = 30000 //等待延迟30s
const $ = new Env("【xdkd】")
const notify = $.isNode() ? require('./sendNotify') : '';
let SURLArr = [], SURL = "";
let XURLArr = [], XURL = "";
let ReadURL = process.env.XD_R_URL;
let InfoURL = process.env.XD_I_URL;
let SCKArr = [], SCK = "";
let RCKArr = [], RCK = "";
let RBDArr = [], RBD = "";
let IBDArr = [], IBD = "";
let detail = ``;
let Account = ["【Sam】","【月锡】","【RL】"];

  if (process.env.XD_S_URL && process.env.XD_S_URL.indexOf('\n') > -1) {
  SURL = process.env.XD_S_URL.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  SURL = process.env.XD_S_URL.split()
  } 
  Object.keys(SURL).forEach((item) => {
        if (SURL[item]) {
          SURLArr.push(SURL[item])
        }
  })

  if (process.env.XD_X_URL && process.env.XD_X_URL.indexOf('\n') > -1) {
  XURL = process.env.XD_X_URL.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  XURL = process.env.XD_X_URL.split()
  } 
  Object.keys(XURL).forEach((item) => {
        if (XURL[item]) {
          XURLArr.push(XURL[item])
        }
  })

  if (process.env.XD_S_CK && process.env.XD_S_CK.indexOf('\n') > -1) {
  SCK = process.env.XD_S_CK.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  SCK = process.env.XD_S_CK.split()
  } 
  Object.keys(SCK).forEach((item) => {
        if (SCK[item]) {
          SCKArr.push(SCK[item])
        }
  })

   if (process.env.XD_R_CK && process.env.XD_R_CK.indexOf('\n') > -1) {
  RCK = process.env.XD_R_CK.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  RCK = process.env.XD_R_CK.split()
  } 
  Object.keys(RCK).forEach((item) => {
        if (RCK[item]) {
          RCKArr.push(RCK[item])
        }
  })
 
   if (process.env.XD_R_BD && process.env.XD_R_BD.indexOf('\n') > -1) {
  RBD = process.env.XD_R_BD.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  RBD = process.env.XD_R_BD.split()
  } 
  Object.keys(RBD).forEach((item) => {
        if (RBD[item]) {
          RBDArr.push(RBD[item])
        }
  })

   if (process.env.XD_I_BD && process.env.XD_I_BD.indexOf('\n') > -1) {
  IBD = process.env.XD_I_BD.split('\n');
  console.log(`您选择的是用换行隔开\n`)
  } 
  else
  {
  IBD = process.env.XD_I_BD.split()
  } 
  Object.keys(IBD).forEach((item) => {
        if (IBD[item]) {
          IBDArr.push(IBD[item])
        }
  })


      console.log(`============ 共${SCKArr.length}个账号  =============\n`)
      console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
      console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
!(async () => {
  if (!SCKArr[0]) {
    console.log($.name, '【提示】请把CK填入Github 的 Secrets 中，请以回车隔开')
    return;
  }
       
   for (let i = 0; i <SCKArr.length; i++) {
    if (SCKArr[i]) {
      SignURL = SURLArr[i];
      SignCK = SCKArr[i];
      BoxURL = XURLArr[i];
      ReadCK = RCKArr[i];
      ReadBD = RBDArr[i];
      InfoBD = IBDArr[i];
      account = Account[i];
     console.log(`【开启任务】开始执行账号${account}的任务`);
     detail = `【账号】${account}\n`;
    if($.time('HH')==22 || $.time('HH')==23) await Sign();
    await Box();
    await Read();
    await Info();
    if($.time('HH')==13 || $.time('HH')==22){
    await notify.sendNotify($.name+'|'+account, detail)
    }
    // console.log(`【完成任务】共完成账号${$.account}的${$.task}个任务`)
    }
   console.log(`⏱⏱⏱请等待3s后执行下一个账号任务⏱⏱⏱`);
   //await $.wait(3000);    
   }  
     console.log(`🎉🎉🎉运行结束🎉🎉🎉`)
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


function Sign() {
    return new Promise((resolve, reject) => {
       let myrequest = {
            url: SignURL,
            headers: {
               "Cookie":SignCK,
               "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
            }
        };
        $.get(myrequest, async(error, response, data) => {
          try{
           let readres = JSON.parse(data);
            //console.log(readres)
           if (readres.ret == 'ok') {
            console.log(`【今日签到】获得：${readres.datas.signAmt}元；`);
            //detail += `【今日签到】获得：${readres.datas.signAmt}元；\n`;
            await $.wait(1000);
            }
           else  {
            console.log(`【今日签到】今日签到失败；`);
            //detail += `【今日签到】今日签到失败；\n`;
            await $.wait(1000);
            }
          }
           catch(error) {   
               let readres = JSON.parse(data);
               //console.log(readres)
              console.log(`本次任务出现异常，请等待1s后执行下一个任务。`)
              //detail += `本次任务出现异常，请等待1s后执行下一个任务。\n`;
            await $.wait(1000);
            }
          resolve()
        })
    })
}

function Box() {
    return new Promise((resolve, reject) => {
       let myrequest = {
            url: BoxURL,
            headers: {
               "Cookie":SignCK,
               "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
            }
        };
        $.get(myrequest, async(error, response, data) => {
          try{
           let readres = JSON.parse(data);
            //console.log(readres)
           if (readres.ret == 'ok') {
            console.log(`【宝箱奖励】获得${readres.datas.randomBoxProfit}元；`);
            //detail += `【宝箱奖励】获得${readres.datas.randomBoxProfit}元；\n`;
            await $.wait(1000);
            }
           else  {
            console.log(`【宝箱奖励】打开宝箱失败；`);
            //detail += `【宝箱奖励】打开宝箱失败；\n`;
            await $.wait(1000);
            }
          }
           catch(error) {   
               //let readres = JSON.parse(data);
               //console.log(readres)
              console.log(`本次任务出现异常，请等待1s后执行下一个任务。`)
              //detail += `本次任务出现异常，请等待1s后执行下一个任务。\n`;
            await $.wait(1000);
            }
          resolve()
        })
    })
}

function Read() {
    return new Promise((resolve, reject) => {
       min=6411111
       max=7499999
       num=Math.floor(Math.random()*(max-min+1)+min)
       let myrequest = {
            url: ReadURL,
            headers: {
               "Cookie":ReadCK,
               "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
            },
           body: "paytype=1&articleID="+num+ReadBD
        };
        $.post(myrequest, async(error, response, data) => {
          try{
           let readres = data;
            //console.log(readres)
           if (readres == 'ok') {
            console.log(`【阅读文章】获得0.005元!`);
            //detail += `阅读文章】获得0.005元!\n`;
            await $.wait(1000);
            }
           else  {
            console.log(`【阅读文章】未获得奖励；`);
            //detail += `【阅读文章】未获得奖励；\n`;
            await $.wait(1000);
            }
          }
           catch(error) {   
              let readres = data;
               //console.log(readres)
              console.log(`本次任务出现异常，请等待1s后执行下一个任务。`)
              //detail += `本次任务出现异常，请等待1s后执行下一个任务。\n`;
            await $.wait(1000);
            }
          resolve()
        })
    })
}


function Info() {
    return new Promise((resolve, reject) => {
       let myrequest = {
            url: InfoURL,
            headers: {
               "Cookie":SignCK,
               "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
            },
           body: InfoBD
        };
        $.post(myrequest, async(error, response, data) => {
          try{
           let readres = JSON.parse(data);
            //console.log(readres)
           if (readres.ret == 'ok') {
            console.log(`【收益信息】今日收益：${readres.datas.userInfo.account.todayAccount}元；现金收益：${readres.datas.userInfo.account.account}元；`);
            detail += `【收益信息】今日收益：${readres.datas.userInfo.account.todayAccount}元；现金收益：${readres.datas.userInfo.account.account}元；\n`;
            await $.wait(1000);
            }
           else  {
            console.log(`【收益信息】未查询到收益信息；`);
            detail += `【收益信息】未查询到收益信息；\n`;
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



function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
