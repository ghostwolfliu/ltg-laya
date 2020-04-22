import UI_hot_game from "../UI/LTGame/UI_hot_game";
import LTSDK from "../../../../SDK/LTSDK";
import Awaiters from "../../../Async/Awaiters";
import LTPlatform from "../../../Platform/LTPlatform";
import { EPlatformType } from "../../../Platform/EPlatformType";
import MathEx from "../../../LTUtils/MathEx";

export default class View_HotGame {

    static CreateView(tagUI: fgui.GComponent): View_HotGame {
        if (tagUI == null) return null;

        // 额外判定一次是否支持交叉推广,如果不支持,则隐藏交叉推广
        if (!LTPlatform.instance.isSupportJumpOther) {
            tagUI.dispose();
            return null;
        }

        if (tagUI instanceof UI_hot_game) {
            return new View_HotGame(tagUI);
        }
        let uiInstance = UI_hot_game.createInstance();
        tagUI.parent.addChildAt(uiInstance, tagUI.parent.getChildIndex(tagUI));
        uiInstance.setXY(tagUI.x, tagUI.y);
        tagUI.dispose();
        return new View_HotGame(uiInstance);
    }

    private _ui: UI_hot_game;
    public get ui(): UI_hot_game {
        return this._ui;
    }

    private constructor(ui: UI_hot_game) {
        this._ui = ui;
        this._Init();
    }

    /**
     * 储存的广告
     */
    private _cacheAds: SDK.ADInfoData[];
    private _cacheIndex: number;
    private _showAd: SDK.ADInfoData;
    private _remainUpdateTime: number;

    /**
     * 每五秒更新一次
     */
    private _updateTime: number = 5000;

    private _Init() {
        this._cacheAds = LTSDK.instance.adManager.GetADListByLocationId(0);
        this._cacheIndex = MathEx.RandomInt(0, this._cacheAds.length);
        this.ui.onClick(this, this._OnClickAD);
        this._UpdateUI();
        this._LoopUpdate();
    }

    private async _LoopUpdate() {

        while (this.ui && !this.ui.isDisposed) {
            await Awaiters.Frames(1);
            this._remainUpdateTime -= Laya.timer.delta;
            if (this._remainUpdateTime < 0) {
                this._UpdateUI();
            }
        }
    }

    private _UpdateUI() {
        this._showAd = this._cacheAds[this._cacheIndex];
        this._cacheIndex++;
        if (this._cacheIndex >= this._cacheAds.length) {
            this._cacheIndex = 0;
        }
        this.ui.m_ic.m_icon.url = this._showAd.ad_img;
        this._remainUpdateTime = this._updateTime;
    }

    private _OnClickAD() {
        let uid = this._showAd.ad_appid;
        switch (LTPlatform.instance.platform) {
            case EPlatformType.Oppo:
            case EPlatformType.Vivo:
                uid = this._showAd.ad_package;
                break;
            default:
                break;
        }
        LTPlatform.instance.NavigateToApp(uid);
        this._UpdateUI();
    }

}