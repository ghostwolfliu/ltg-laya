/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class LTG_UI_view_item_sign_06 extends fgui.GComponent {

	public m_state_get:fgui.Controller;
	public m_img_bg:fgui.GImage;
	public m_img_can_get:fgui.GImage;
	public m_img_got:fgui.GImage;
	public m_loader_icon:fgui.GLoader;
	public m_text_day:fgui.GTextField;
	public m_text_name:fgui.GTextField;

	public static URL:string = "ui://hbq27te38gel5a";

	public static createInstance():LTG_UI_view_item_sign_06 {
		return <LTG_UI_view_item_sign_06><any>(fgui.UIPackage.createObject("LTCom","view_item_sign_06"));
	}

	public constructor() {
		super();
	}

	protected onConstruct(): void {
		this.m_state_get = this.getControllerAt(0);
		this.m_img_bg = <fgui.GImage><any>(this.getChildAt(0));
		this.m_img_can_get = <fgui.GImage><any>(this.getChildAt(2));
		this.m_img_got = <fgui.GImage><any>(this.getChildAt(3));
		this.m_loader_icon = <fgui.GLoader><any>(this.getChildAt(4));
		this.m_text_day = <fgui.GTextField><any>(this.getChildAt(5));
		this.m_text_name = <fgui.GTextField><any>(this.getChildAt(6));
	}
}