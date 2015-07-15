package com.appdynamics.faultinjection;

import javax.xml.bind.annotation.XmlElement;

//Fault Class
public class Fault {
 
	//No Argument Constructor
	public Fault() {
	}
	
	//Argument Constructor
	/*public Fault(int id, String bugname, String username, String timeframe) {
		super();
		this.id = id;
		this.bugname = bugname;
		this.username = username;
		this.timeframe = timeframe;
	}*/
	
	//Private fields
	@XmlElement(name="id")
	private int id;
	@XmlElement(name="bugname")
	private String bugname;
	@XmlElement(name="username")
	private String username;
	@XmlElement(name="timeframe")
	private String timeframe;
	@XmlElement(name="selectedfromtime")
	private String selectedfromtime;
	@XmlElement(name="selectedtotime")
	private String selectedtotime;
	
	
	public Fault(int id, String bugname, String username, String timeframe,
			String selectedfromtime, String selectedtotime) {
		super();
		this.id = id;
		this.bugname = bugname;
		this.username = username;
		this.timeframe = timeframe;
		this.selectedfromtime = selectedfromtime;
		this.selectedtotime = selectedtotime;
	}

	public String getSelectedfromtime() {
		return selectedfromtime;
	}

	public void setSelectedfromtime(String selectedfromtime) {
		this.selectedfromtime = selectedfromtime;
	}

	public String getSelectedtotime() {
		return selectedtotime;
	}

	public void setSelectedtotime(String selectedtotime) {
		this.selectedtotime = selectedtotime;
	}

	//Getter and Setter of Id
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	//Getter and Setter of bugname
	public String getBugname() {
		return bugname;
	}

	public void setBugname(String bugname) {
		this.bugname = bugname;
	}
	
	//Getter and Setter of username
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	//Getter and Setter of timeframe
	public String getTimeframe() {
		return timeframe;
	}

	public void setTimeframe(String timeframe) {
		this.timeframe = timeframe;
	}
}