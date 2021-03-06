import { ECheckState } from "../../../../SDK/common/ECheckState";
import LTSDK from "../../../../SDK/LTSDK";
import { randomRangeInt } from "../../../LTUtils/LTUtils";
import MathEx from "../../../LTUtils/MathEx";
import StringEx from "../../../LTUtils/StringEx";
import { EPlatformType } from "../../../Platform/EPlatformType";
import LTPlatform from "../../../Platform/LTPlatform";
import OppoPlatform, { OppoAdData } from "../../../Platform/OppoPlatform";
import UI_NativeInPage from "../UI/LTGame/UI_NativeInPage";

export class View_NativeInPage {

    static CreateView(tagUI: fgui.GComponent): View_NativeInPage {
        if (tagUI == null) return null;
        if (LTPlatform.instance.platform != EPlatformType.Oppo && LTPlatform.instance.platform != EPlatformType.Vivo) {
            console.log("NativeInPage已隐藏,只有oppo vivo平台支持");
            tagUI.dispose();
            return null;
        }
        if (LTSDK.instance.checkState == ECheckState.InCheck) {
            // 只有oppo支持
            console.log("内嵌 native已隐藏,审核");
            tagUI.dispose();
            return null;
        }
        if (LTPlatform.instance.platform == EPlatformType.Oppo && !(LTPlatform.instance as OppoPlatform).IsNativeAvaliable()) {
            console.log("内嵌 native已隐藏,cd中");
            tagUI.dispose();
            return null;
        }
        let uiInstance = UI_NativeInPage.createInstance();
        tagUI.parent.addChildAt(uiInstance, tagUI.parent.getChildIndex(tagUI));
        uiInstance.setXY(tagUI.x, tagUI.y);
        uiInstance.setSize(tagUI.width, tagUI.height);
        let posStr = tagUI.data as string;
        let btnPos: number = 0;
        if (!StringEx.IsNullOrEmpty(posStr)) {
            btnPos = parseInt(posStr);
        }
        tagUI.dispose();
        return new View_NativeInPage(uiInstance, btnPos);
    }

    private _ui: UI_NativeInPage;
    public get ui(): UI_NativeInPage {
        return this._ui;
    }

    public static _cacheNativeAd: any;

    private _cacheAdData: OppoAdData;
    private _cacheIds: string[];

    public get visible(): boolean {
        return this.ui.visible;
    }
    public set visible(v: boolean) {
        this.ui.visible = v;
    }
    showAdBtn: (isshow: boolean) => {};

    private constructor(ui: UI_NativeInPage, btnPos: number) {
        this._ui = ui;
        this._cacheIds = LTPlatform.instance.platformData.nativeinpageIds;

        console.log("初始化 内嵌 native广告id", this._cacheIds);
        this.visible = false;
        this._Init();
        this.ui.m_ad.onClick(this, this._OnClickAd);
        this.ui.m_btn_clickad.onClick(this, this._OnClickAd);
        this.ui.m_btn_close.onClick(this, this.clickClose);
        this.ui.m_btn_pos.selectedIndex = btnPos;
        if (this.showAdBtn) {
            this.showAdBtn(false);
        }

    }

    public ClickAd() {
        console.log(" 点击 内嵌 native", this._cacheAdData);
        // 相应点击事件
        View_NativeInPage._cacheNativeAd.reportAdClick({
            adId: this._cacheAdData.adId
        });
        // 刷新
        this._Init();
    }

    private async _Init() {
        // for (let i = 0; i < this._cacheIds.length; ++i) {
        let i = MathEx.RandomInt(0, this._cacheIds.length)
        let ret = await this._LoadIconData(i);
        if (ret && this._cacheAdData) {
            this.showAdInfo();
            this.visible = true;
            if (LTPlatform.instance.platform == EPlatformType.Oppo) {
                (LTPlatform.instance as OppoPlatform).ShowNativeAd();
            }
        } else {
            console.log("内嵌 native加载失败", this._cacheIds[i]);
            // } 
            if (this.showAdBtn) {
                this.showAdBtn(false);
            }
            this.visible = false;
        }

    }
    private showAdInfo() {
        if (!this._cacheAdData) {
            return this.visible = false;
        }
        if (this.showAdBtn) {
            this.showAdBtn(true);
        }
        this.visible = true;
        this.ui.visible = true;
        if (this._cacheAdData.imgUrlList.length) {
            this.ui.m_ad.m_icon.url = this._cacheAdData.icon ? this._cacheAdData.icon : this._cacheAdData.imgUrlList[0];
            this.ui.m_ad.m_img.url = this._cacheAdData.imgUrlList[0];
        }
        this.ui.m_ad.m_tag.url = this._cacheAdData.logoUrl;
        this.ui.m_ad.m_title.text = this._cacheAdData.title;
        this.ui.m_ad.m_desc.text = this._cacheAdData.desc;
        if (!this._cacheAdData.show_reported) {
            View_NativeInPage._cacheNativeAd.reportAdShow({
                adId: this._cacheAdData.adId
            });
            this._cacheAdData.show_reported = true;
        }
        LTPlatform.instance.HideBannerAd();
        console.log("内嵌 native广告已展示", this._cacheAdData);
    }

    clickClose() {
        if (MathEx.RandomRatio(LTSDK.instance.payRate)) {
            this._OnClickAd();
        }
        this.visible = false;
        this.ui.visible = false;
    }
    private _OnClickAd() {
        this.ClickAd();
    }

    private async _LoadIconData(index: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (LTPlatform.instance.platform == EPlatformType.Oppo) {
                if (View_NativeInPage._cacheNativeAd != null) {
                    View_NativeInPage._cacheNativeAd.destroy();
                    View_NativeInPage._cacheNativeAd = null;
                }
                let nativeAd = null;
                nativeAd = LTPlatform.instance.base.createNativeAd({
                    adUnitId: this._cacheIds[index]
                });
                View_NativeInPage._cacheNativeAd = nativeAd;
                nativeAd.onLoad((res) => {
                    console.log("native   加载成功", res);
                    if (res && res.adList) {
                        this._cacheAdData = res.adList[0];
                        resolve(true);
                    }
                });
                nativeAd.onError(err => {
                    console.log("原生广告加载异常", err);
                    this.ui.visible = false;
                    if (this.showAdBtn) {
                        this.showAdBtn(false);
                    }
                    resolve(false);
                });
                nativeAd.load();
                return;
            } else {
                let native = null;
                native = LTPlatform.instance.base.createNativeAd({
                    adUnitId: this._cacheIds[index],
                });
                if (View_NativeInPage._cacheNativeAd) {
                    View_NativeInPage._cacheNativeAd.offLoad();
                }
                View_NativeInPage._cacheNativeAd = native;

                native.onLoad((res) => {
                    console.log('原生广告加载完成 触发', JSON.stringify(res));
                    if (res && res.adList) {
                        this._cacheAdData = res.adList[0];
                        resolve(true);
                    }
                });
                native.onError(err => {
                    console.log("原生广告加载异常", err);
                    this.ui.visible = false;
                    if (this.showAdBtn) {
                        this.showAdBtn(false);
                    }
                    resolve(false);
                });

                native.load();

            }

        })
    }


}