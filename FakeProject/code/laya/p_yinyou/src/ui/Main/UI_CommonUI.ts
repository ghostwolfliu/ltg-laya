/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_CommonUI extends fgui.GComponent {

	public m_title:fgui.GTextField;
	public m_btn_back:fgui.GButton;
	public m_btn_sign:fgui.GButton;
	public m_btn_endshare:fgui.GButton;
	public m_btn_endreward:fgui.GButton;
	public m_btn_endlose:fgui.GButton;
	public m_btn_tryskin:fgui.GButton;
	public m_btn_set:fgui.GButton;
	public m_btn_roll:fgui.GButton;
	public m_btn_onemore:fgui.GButton;
	public m_btn_moudle:fgui.GButton;
	public m_btn_offline:fgui.GButton;
	public m_btn_unlockprogress:fgui.GButton;
	public m_btn_exskin:fgui.GButton;
	public m_btn_bonus:fgui.GButton;
	public static URL:string = "ui://kk7g5mmmfkl1g";

	public static createInstance():UI_CommonUI {
		return <UI_CommonUI>(fgui.UIPackage.createObject("Main", "CommonUI"));
	}

	protected onConstruct():void {
		this.m_title = <fgui.GTextField>(this.getChildAt(1));
		this.m_btn_back = <fgui.GButton>(this.getChildAt(2));
		this.m_btn_sign = <fgui.GButton>(this.getChildAt(3));
		this.m_btn_endshare = <fgui.GButton>(this.getChildAt(4));
		this.m_btn_endreward = <fgui.GButton>(this.getChildAt(5));
		this.m_btn_endlose = <fgui.GButton>(this.getChildAt(6));
		this.m_btn_tryskin = <fgui.GButton>(this.getChildAt(7));
		this.m_btn_set = <fgui.GButton>(this.getChildAt(8));
		this.m_btn_roll = <fgui.GButton>(this.getChildAt(9));
		this.m_btn_onemore = <fgui.GButton>(this.getChildAt(10));
		this.m_btn_moudle = <fgui.GButton>(this.getChildAt(11));
		this.m_btn_offline = <fgui.GButton>(this.getChildAt(12));
		this.m_btn_unlockprogress = <fgui.GButton>(this.getChildAt(13));
		this.m_btn_exskin = <fgui.GButton>(this.getChildAt(14));
		this.m_btn_bonus = <fgui.GButton>(this.getChildAt(15));
	}
}