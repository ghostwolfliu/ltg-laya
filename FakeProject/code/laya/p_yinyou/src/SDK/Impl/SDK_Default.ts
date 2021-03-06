import LTHttp from "../../LTGame/Net/LTHttp";
import { EPlatformType } from "../../LTGame/Platform/EPlatformType";
import LTPlatform from "../../LTGame/Platform/LTPlatform";
import LTRespackManager from "../../LTGame/Res/LTRespackManager";
import { ECheckState } from "../common/ECheckState";
import FakeAdDefine from "../common/FakeAdDefine";
import { ISDK, RemoteConfig } from "../Interface/ISDK";
import SDKADManager from "../SDKADManager";
import { DateInfo } from "./SDK_CQ";
import StringEx from "../../LTGame/LTUtils/StringEx";
import GameData from "../../script/common/GameData";
import CommonSaveData from "../../LTGame/Commom/CommonSaveData";
import md5 from "./../Libs/md5.js";

export default class SDK_Default implements ISDK {
    configs: RemoteConfig;
    shieldHours: string[];
    severTime: string;
    payRate: number;
    checkState: ECheckState;
    get isShielding(): boolean {
        return this.configs.isShielding;
    }
    get isDelayClose(): boolean {
        return this.configs.isDelayClose;
    }
    get isADEnable(): boolean {
        return this.configs.isADEnable;
    }
    get isNavEnable(): boolean {
        return this.configs.isNavEnable;
    }

    isADConfigInited: boolean;
    isConfigEnable: boolean;
    flg: string;
    channel: string;
    appId: string;
    controlVersion: string;
    adManager: SDKADManager;
    uid: string = "";
    dateInfo: DateInfo[];
    navLevels: number[];
    token: string;
    timeRub: number;
    randomNum: string;
    Init(flg: string, channel: string, controlVersion: string, appid: string) {
        this.timeRub = Date.now();
        this.randomNum = Math.random().toString(36).substr(2, 8);
        this.configs = new RemoteConfig();
        this.isADConfigInited = true;
        this.navLevels = [];
        this.payRate = 0;
        this.checkState = ECheckState.InCheck;
        this.isConfigEnable = true;
        this.flg = flg;
        this.channel = channel;
        this.controlVersion = controlVersion;
        this.appId = appid;
        if (StringEx.IsNullOrEmpty(CommonSaveData.instance.uid)) {
            let uuid = md5.hex_md5(`${this.appId}#${this.timeRub}#${this.randomNum}#43b49394197b65540979c7143da7c8a8`);
            CommonSaveData.instance.uid = uuid;
            CommonSaveData.SaveToDisk();
        }
        this.uid = CommonSaveData.instance.uid;
        this.severTime = "";
        this.shieldHours = [];
        this.adManager = new SDKADManager();
        console.log("SDK:Init", this);
    }
    public getToken(): Promise<string> {
        return new Promise<string>((resolve, rej) => {
            if (this.token) {
                resolve(this.token);
            } else {
                let sendData = {
                    appid: LTPlatform.instance.platformData.appId
                };
                LTHttp.Send('https://games.api.gugudang.com//api/get/games/token', Laya.Handler.create(this, (res) => {
                    console.log(res);
                    res = JSON.parse(res);
                    if (res && res.code == 0) {
                        this.token = res.data.data.access_token;
                        resolve(this.token);
                    } else {
                        rej(null);
                    }
                }), null, true, sendData);
            }
        })
    }
    /**CDN 节假日信息配置 年底需更新次年数据 */
    RequestRemoteDateInfo() {
        LTHttp.Send(`https://file.gugudang.com/res/down/public/configs/Holiday.json`, Laya.Handler.create(this, this.onGetDatesInfo),
            Laya.Handler.create(this, this.onGetDatesError), true);
    }
    onGetDatesError(res: string) {
        console.error('云 获取日历信息失败', res);

    }
    reportShareInfo(videoId: string, shareId: string) {

    }
    onGetDatesInfo(res: string) {
        let days = JSON.parse(res);
        let data = days as DateInfo[];
        this.dateInfo = data.filter(e => e.type != 0);
        console.log('云 获取休息日信息', this.dateInfo);
        this._RequestCheckState();
    }


    private _OnGetSelfAdInfosFailed(res: string) {
        console.error("拉取到广告信息失败", res);
    }

    private _OnGetSelfAdInfos(res: string) {
        let adJson = JSON.parse(res) as FakeAdDefine[];
        console.log("拉取到广告信息", adJson.length, "条");
        let fakePosId = 0;
        let adList = [];
        for (let fakeAd of adJson) {
            let adData = {} as SDK.ADInfoData;
            adData.ad_appid = fakeAd.id;
            adData.ad_img = fakeAd.icon;
            adData.ad_name = fakeAd.title;
            adData.ad_package = fakeAd.package;
            if (adData.ad_appid != this.appId) {
                adList.push(adData);
            }
        }

        // 加入广告控制器
        this.adManager.InitADs(fakePosId, adList);

    }

    protected _RequestCheckState() {
        console.log('审核状态由重庆后台配置', `审核状态:${ECheckState[this.checkState]}`);
        if (this.checkState != ECheckState.InCheck) {
            //工作时时段屏蔽 
            let date = this.severTime.substring(0, 10).replace(/\-/g, '');
            let h = parseInt(this.severTime.substring(12, 2));
            let today = this.dateInfo.filter(e => e.dayStr == date);
            let isHoliday = false;
            if (today && today.length) {
                isHoliday = today[0].type == 1;//type：0 工作日 1 周末&节假日 
            }
            if (isHoliday) {
                console.log('假期休息', date, h);
            } else {
                console.log('工作日');
                if (this.shieldHours && this.shieldHours.indexOf(h.toString()) >= 0) {
                    console.log('工作', this.shieldHours, h);
                    this.payRate = 0;
                    this.navLevels = [];
                }
            }
        }
        if (this.isShielding || this.checkState == ECheckState.InCheck) {
            //屏蔽洗钱 
            this.payRate = 0;
            this.navLevels = [];
            this.configs.gamecenterLevel = 1000;
        }
        console.log(`${this.appId}---云控版本为:`, this.controlVersion, `游戏中心Levels:${this.navLevels}`, "config:", this.isConfigEnable, `广告开关:${this.isADEnable}, 审核状态:${ECheckState[this.checkState]},误触概率:${this.payRate},屏蔽状态:${this.isShielding},延迟按钮:${this.isDelayClose}`);
    }
    Login(code: string, fromAppId: string) {
        console.log("SDK:Login", code, fromAppId);
    }

    RequestRemoteConfig() {
        console.log("SDK:RequestRemoteConfig");
    }

    RequestADList() {
        let configFile = 'SelfAdConfig.json';
        if (LTPlatform.instance.platform == EPlatformType.Oppo) {
            configFile = 'YTSelf.json';
        }
        LTHttp.Send(`https://file.gugudang.com/res/down/public/configs/${configFile}`, Laya.Handler.create(this, this._OnGetSelfAdInfos),
            Laya.Handler.create(this, this._OnGetSelfAdInfosFailed), true);
    }

    ReportClickAd(ad_id: number, locationId: number, jumpSuccess: boolean) {
        console.log("SDK:ReportClickAd", ad_id);
    }

    ReportShowAd(adList: SDK.ADReportShowData[]) {
        console.log("SDK:ReportShowAd", adList);
    }

    ReportStat(isShare: boolean, sid: string) {
        console.log("SDK:ReportStat", isShare, sid);
    }
    ReportLogin() {

    }
    ReportDaily() { }
    /**查询周排名 
* @param levelID 关卡
* @param score 分数/时长
* @param onGetList 回调处理
*/
    GetWeekRankList(levelID: number, score: number, onGetList: Function) {

    }
    /**查询日排名 
   * @param levelID 关卡
   * @param score 分数/时长
    *@param onGetList 回调处理
   */
    GetDayRankList(levelID: number, score: number, onGetList: Function) {

    }
    /**
     * 按关卡上报排名 
     * @param levelID 关卡
     * @param score 分数/时长
     */
    RecordRankInfo(levelID: number, score: number) {

    }
}