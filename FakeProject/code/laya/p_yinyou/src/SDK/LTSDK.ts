import { ISDK } from "./Interface/ISDK";
import LTPlatform from "../LTGame/Platform/LTPlatform";
import { EPlatformType } from "../LTGame/Platform/EPlatformType";
import WXPlatform from "../LTGame/Platform/WXPlatform";
import GameData from "../script/common/GameData";
import StringEx from "../LTGame/LTUtils/StringEx";
import SDK_CQ from "./Impl/SDK_CQ";

export default class LTSDK {

    private static _instance: ISDK;
    public static get instance(): ISDK {
        if (this._instance == null) {
            console.error("sdk尚未初始化,请先调用CreateInstance进行初始化");
            return null;
        }
        return this._instance;
    }

    public static get isInited(): boolean {
        return this._instance != null;
    }

    /**
     * 
     * @param sdkClass 初始化的类
     * @param identifyId 游戏标识
     * @param controlVersion 广告版本
     */
    public static CreateInstace(sdkClass: any, identifyId: string, controlVersion: string, appId: string): ISDK {
        if (this._instance != null) {
            console.error("SDK不能反复进行初始化");
            return this._instance;
        }
        this._instance = new sdkClass();
        console.log('开始初始化SDK');
        // 初始化sdk
        let channel = LTSDK.getChannel();
        this._instance.Init(identifyId, channel, controlVersion, appId);
        console.log(`channel=${channel}`);
        // 请求云控信息
        this._instance.RequestRemoteConfig();

        // 自动sdk登录
        LTPlatform.instance.onLoginEnd = Laya.Handler.create(null, () => {
            // if (LTPlatform.instance.platform == EPlatformType.WX) {
            //     if ((LTPlatform.instance as WXPlatform).loginCode) {
            //         LTSDK.instance.Login((LTPlatform.instance as WXPlatform).loginCode, LTPlatform.instance.GetFromAppId());
            //     } else {
            //         console.log("wx平台未登录,跳过登录sdk");
            //         LTSDK.instance.Login((LTPlatform.instance as WXPlatform).loginCode, LTPlatform.instance.GetFromAppId());
            //     }
            // } else {
            if (LTPlatform.instance.loginState.isLogin) {
                LTSDK.instance.Login(LTPlatform.instance.loginState.code, LTPlatform.instance.GetFromAppId());
            } else {
                console.log("平台未登录,跳过登录sdk");
                LTSDK.instance.Login(LTSDK.uuid, LTPlatform.instance.GetFromAppId());
            }
            // }

        });
        return this._instance;
    }
    public static get uuid() {
        console.log(GameData.instance.uid);
        if (StringEx.IsNullOrEmpty(GameData.instance.uid)) {
            GameData.instance.uid = 'YT_' + Number(Math.random().toString().substr(4, 3) + Date.now()).toString(36);
            GameData.SaveToDisk();
        }
        return GameData.instance.uid;
    }

    private static getChannel() {
        let channel = LTPlatform.instance.GetStorage('user_from_channel');
        let options = LTPlatform.instance.lauchOption as any;
        console.log('本地channel', channel);
        if (LTSDK.instance instanceof SDK_CQ && options && options.query) {
            channel = options.query.channelId;
        }
        if (!channel) {
            if (options && options.query) {
                channel = options.query['channel'];
                console.log('options channel', channel);
            }
            if (!channel) {
                console.log('没有本地数据,channel默认 own');
                channel = 'own';
            }
            LTPlatform.instance.SetStorage('user_from_channel', channel);
        }
        return channel;
    }
}