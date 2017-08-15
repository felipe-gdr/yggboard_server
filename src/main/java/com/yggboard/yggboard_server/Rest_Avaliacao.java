package com.yggboard.yggboard_server;

import java.util.ArrayList;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.simple.JSONArray;

import com.mongodb.BasicDBObject;

@Singleton
//@Lock(LockType.READ)
@Path("/avaliacao")

public class Rest_Avaliacao {

	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();
	Avaliacao avaliacao = new Avaliacao();

	@Path("/cria/mapa")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Boolean criaMapa(@QueryParam("token") String token, @QueryParam("usuarioId") String usuarioId, @QueryParam("empresaId") String empresaId, @QueryParam("avaliacaoId") String avaliacaoId)  {
	

		if (token == null) {
			return false;
		};
		if ((commons_db.getCollection(token, "usuarios", "documento.token")) == null) {
			return false;
		};

		return avaliacao.criaMapaAvaliacao (usuarioId, empresaId, avaliacaoId);

	};
	@Path("/mapa")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public BasicDBObject Mapa(@QueryParam("token") String token, @QueryParam("usuarioId") String usuarioId, @QueryParam("empresaId") String empresaId, @QueryParam("avaliacaoId") String avaliacaoId)  {
		if (token == null) {
			return null;
		};
		if ((commons_db.getCollection(token, "usuarios", "documento.token")) == null) {
			return null;
		};
		if (empresaId == null) {
			return null;
		};
		
		return avaliacao.mapa(usuarioId, empresaId, avaliacaoId);
	};

	@Path("/colaboradores")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray Colaboradores(@QueryParam("token") String token, @QueryParam("empresaId") String empresaId, @QueryParam("avaliacaoId") String avaliacaoId)  {
		if ((commons_db.getCollection(token, "usuarios", "documento.token")) == null) {
			return null;
		};
		if (empresaId == null) {
			return null;
		};
		
		return avaliacao.colaboradores(empresaId, avaliacaoId);
	};
	
	@Path("/inout")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Boolean MontaMapa(@QueryParam("token") String token, @QueryParam("colaboradorId") String colaboradorId, @QueryParam("colaboradorObjetoId") String colaboradorObjetoId, @QueryParam("assunto") String assunto, @QueryParam("empresaId") String empresaId, @QueryParam("avaliacaoId") String avaliacaoId)  {
		if ((commons_db.getCollection(token, "usuarios", "documento.token")) == null) {
			return null;
		};
		if (colaboradorId == null){
			return false;
		};
		if (colaboradorObjetoId == null){
			return false;
		};
		if (assunto == null){
			return false;
		};
		
		return avaliacao.montaMapa(colaboradorId, colaboradorObjetoId, assunto, empresaId, avaliacaoId);
	};
	
	@Path("/atualiza/nota")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Boolean AtualizaNota(@QueryParam("token") String token, @QueryParam("colaboradorId") String avaliadorId, @QueryParam("avaliadorId") String colaboradorId, @QueryParam("habilidadeId") String habilidadeId, @QueryParam("nota") String nota, @QueryParam("empresaId") String empresaId)  {
		if (token == null) {
			return false;
		};
		if ((commons_db.getCollection(token, "usuarios", "documento.token")) == null) {
			return false;
		};
		if (colaboradorId == null){
			return false;
		};
		if (habilidadeId == null){
			return false;
		};
		if (nota == null){
			return false;
		};
		if (avaliadorId == null){
			return false;
		};

		return avaliacao.atualizaNota(avaliadorId, colaboradorId, habilidadeId, nota, empresaId);
	};

	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Object> Lista(@QueryParam("token") String token, @QueryParam("empresaId") String empresaId)  {
		if (token == null) {
			return null;
		};
		if ((commons_db.getCollection(token, "usuarios", "documento.token")) == null) {
			return null;
		};
		if (empresaId == null){
			return null;
		};

		return avaliacao.lista(empresaId);
	};
	
};
