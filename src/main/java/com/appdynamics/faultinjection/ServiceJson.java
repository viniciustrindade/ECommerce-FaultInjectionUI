package com.appdynamics.faultinjection;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;

import com.google.gson.Gson;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.api.json.JSONConfiguration;
import com.sun.jersey.core.util.MultivaluedMapImpl;

@Path("/service/json")
public class ServiceJson {

	@POST
	@Path("/login")
	@Consumes("application/x-www-form-urlencoded")
	@Produces(MediaType.TEXT_PLAIN)
	public String validateUser(@Context HttpServletRequest req,
			@FormParam("username") String name,
			@FormParam("password") String password) throws Exception {
		Client client = Client.create();
		WebResource webResource = client.resource(GetConfigrestv1()
				+ "user/login");
		try {
			MultivaluedMap<String, String> formData = new MultivaluedMapImpl();
			formData.add("username", name);
			formData.add("password", password);
			ClientResponse response = webResource.type(
					"application/x-www-form-urlencoded").post(
					ClientResponse.class, formData);
			return response.getEntity(String.class);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@POST
	@Path("/savefaults")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces(MediaType.TEXT_PLAIN)
	public String saveFaults(List<Fault> lsFault) throws Exception {

		ClientConfig clientConfig = new DefaultClientConfig();
		clientConfig.getFeatures().put(JSONConfiguration.FEATURE_POJO_MAPPING,
				Boolean.TRUE);
		try {
			ClientResponse response = Client.create(clientConfig)
					.resource(GetConfigrestv2() + "fault/savefaults")
					.type(MediaType.APPLICATION_JSON)
					.post(ClientResponse.class, lsFault);
			return response.getEntity(String.class);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	@POST
	@Path("/injectfaults")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces(MediaType.TEXT_PLAIN)
	public String injectFaults(List<Fault> lsFault) throws Exception {

		ClientConfig clientConfig = new DefaultClientConfig();
		clientConfig.getFeatures().put(JSONConfiguration.FEATURE_POJO_MAPPING,
				Boolean.TRUE);
		try {
			ClientResponse response = Client.create(clientConfig)
					.resource(GetConfigrestv2() + "fault/injectfaults")
					.type(MediaType.APPLICATION_JSON)
					.post(ClientResponse.class, lsFault);
			return response.getEntity(String.class);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@GET
	@Path("/readfaults")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public String readFaults(@Context HttpServletRequest req) throws Exception {

		ClientConfig clientConfig = new DefaultClientConfig();
		clientConfig.getFeatures().put(JSONConfiguration.FEATURE_POJO_MAPPING,
				Boolean.TRUE);
		try {
			List<Fault> response = Client.create(clientConfig)
					.resource(GetConfigrestv2() + "fault/readfaults")
					.accept(MediaType.APPLICATION_JSON)
					.header("username", req.getHeader("username"))
					.get(new GenericType<List<Fault>>() {
					});
			return new Gson().toJson(response);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	@GET
	@Path("/readallfaults")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public String readAllFaults(@Context HttpServletRequest req) throws Exception {

		ClientConfig clientConfig = new DefaultClientConfig();
		clientConfig.getFeatures().put(JSONConfiguration.FEATURE_POJO_MAPPING,
				Boolean.TRUE);
		try {
			List<Fault> response = Client.create(clientConfig)
					.resource(GetConfigrestv2() + "fault/readallfaults")
					.accept(MediaType.APPLICATION_JSON)
					.get(new GenericType<List<Fault>>() {
					});
			return new Gson().toJson(response);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	@GET
	@Path("/stopfaults")
	@Produces({ MediaType.TEXT_PLAIN })
	public String stopfaults(@Context HttpServletRequest req) throws Exception {

		ClientConfig clientConfig = new DefaultClientConfig();
		try {
			ClientResponse response = Client.create(clientConfig)
					.resource(GetConfigrestv2() + "fault/stopfaults")
					.header("username", req.getHeader("username"))
					.header("faultname", req.getHeader("faultname"))
					.get(ClientResponse.class);
			return response.getEntity(String.class);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	private String GetConfigrestv2() {
		CrunchifyGetPropertyValues properties = new CrunchifyGetPropertyValues();
		try {
			return properties.getrestv2Values();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	private String GetConfigrestv1() {
		CrunchifyGetPropertyValues properties = new CrunchifyGetPropertyValues();
		try {
			return properties.getrestv1Values();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}