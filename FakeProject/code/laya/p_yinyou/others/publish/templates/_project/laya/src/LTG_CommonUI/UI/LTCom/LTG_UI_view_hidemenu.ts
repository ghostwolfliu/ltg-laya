/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class LTG_UI_view_hidemenu extends fgui.GComponent {

	public m_btn_notice:fgui.GButton;
	public m_btn_addshortcut:fgui.GButton;
	public m_btn_findgame:fgui.GButton;
	public m_btn_hide:fgui.GButton;

	public static URL:string = "ui://hbq27te38gel67";

	public static createInstance():LTG_UI_view_hidemenu {
		return <LTG_UI_view_hidemenu><any>(fgui.UIPackage.createObject("LTCom","view_hidemenu"));
	}

	public constructor() {
		super();
	}

	protected onConstruct(): void {
		this.m_btn_notice = <fgui.GButton><any>(this.getChildAt(1));
		this.m_btn_addshortcut = <fgui.GButton><any>(this.getChildAt(2));
		this.m_btn_findgame = <fgui.GButton><any>(this.getChildAt(3));
		this.m_btn_hide = <fgui.GButton><any>(this.getChildAt(4));
	}
}