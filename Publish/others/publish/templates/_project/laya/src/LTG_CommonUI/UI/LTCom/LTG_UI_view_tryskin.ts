/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import LTG_UI_btn_refuse from "./LTG_UI_btn_refuse";

export default class LTG_UI_view_tryskin extends fgui.GComponent {

	public m_btn_no:LTG_UI_btn_refuse;
	public m_btn_try:fgui.GButton;
	public m_img_display:fgui.GGraph;
	public m_loader_title:fgui.GLoader;

	public static URL:string = "ui://hbq27te3bl1a8c";

	public static createInstance():LTG_UI_view_tryskin {
		return <LTG_UI_view_tryskin><any>(fgui.UIPackage.createObject("LTCom","view_tryskin"));
	}

	public constructor() {
		super();
	}

	protected onConstruct(): void {
		this.m_btn_no = <LTG_UI_btn_refuse><any>(this.getChildAt(1));
		this.m_btn_try = <fgui.GButton><any>(this.getChildAt(2));
		this.m_img_display = <fgui.GGraph><any>(this.getChildAt(3));
		this.m_loader_title = <fgui.GLoader><any>(this.getChildAt(4));
	}
}