/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_NativeBigAd from "./UI_NativeBigAd";
import UI_btn_native from "./UI_btn_native";

export default class UI_NativeInterstitial extends fgui.GComponent {

	public m_landscape:fgui.Controller;
	public m_ad:UI_NativeBigAd;
	public m_btn_return:UI_btn_native;
	public m_btn_pay:UI_btn_native;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://75kiu87kl2ax4j";

	public static createInstance():UI_NativeInterstitial {
		return <UI_NativeInterstitial>(fgui.UIPackage.createObject("LTGame", "NativeInterstitial"));
	}

	protected onConstruct():void {
		this.m_landscape = this.getControllerAt(0);
		this.m_ad = <UI_NativeBigAd>(this.getChildAt(1));
		this.m_btn_return = <UI_btn_native>(this.getChildAt(2));
		this.m_btn_pay = <UI_btn_native>(this.getChildAt(3));
		this.m_t0 = this.getTransitionAt(0);
	}
}