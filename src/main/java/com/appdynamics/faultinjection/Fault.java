package com.appdynamics.faultinjection;

//Fault Class
public class Fault {
 
	//No Argument Constructor
	public Fault() {
	}
	
	//Argument Constructor
	public Fault(int id, String bugname, String username, String timeframe) {
		super();
		this.id = id;
		this.bugname = bugname;
		this.username = username;
		this.timeframe = timeframe;
	}
	
	//Private fields
	private int id;
	private String bugname;
	private String username;
	private String timeframe;
	
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