import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ModalEvaluacion1 from "./ModalEvaluacion1";

class ModalCurso extends Component{
    state={
      modalInsertar:false
    }
  
    modalInsertar=()=>{
      this.setState({modalInsertar: !this.state.modalInsertar})
    }
    
  
    render(){
      return(

      <div className="ModalCurso">
             
            
             <button className="btn btn-success bg-naranja" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>  +</button>
        
            <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}} >x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="nombre">Perfil:</label>
                            <select name="select" id="perfil" class="form-control">
                                    <option value="---" selected> ------------------ </option>
                                    <option value="Generales" >Generales</option>
                                    <option value="Habilidades blandas">Habilidades blandas</option>
                                    <option value="Encuestas">Encuestas</option>
                                    <option value="Conocimiento Básico">Conocimiento Básico</option>

                            </select>
                            </div>

                            <div class="form-group">
							<label htmlFor="cursos">Cursos: </label>
							<select name="select" id="cursos" class="form-control">
								<option value="---" selected> ------------------ </option>
								<option value="Presentación" >Presentación</option>
								<option value="Sobre la agencia ¿quiénes somos?">Sobre la agencia ¿quiénes somos?</option>
								<option value="Organigrama - Linea de carrera - funciones y plataformas">Organigrama - Linea de carrera - funciones y plataformas</option>
								<option value="Habilidades Blandas">Habilidades Blandas</option>
								<option value="Encuesta de Satisfacción">Encuesta de Satisfacción </option>
								<option value="Metodología SCRUM">Metodología SCRUM </option>
								<option value="Encuesta de Satisfacción">Domina las herramientas de GSuite </option>
								<option value="Reuniones de trabajo efectivo">Reuniones de trabajo efectivo</option>
							</select>
						</div>

						<div class="form-group">
							<label htmlFor="cursos">Actividades: </label>
							<select name="select" id="actividades" class="form-control">
								<option value="---" selected> ------------------ </option>
								<option value="PPT" >PPT</option>
								<option value="Formulario">Formulario</option>
								<option value="E. Final">E. Final</option>
								<option value="Caso">Caso</option>
								<option value="Otro">Otro </option>
								<option value="Jamboard">Jamboard</option>
							</select>
						</div>

						<div class="form-group">
							<label htmlFor="descripcion">Descripción: </label>
							<textarea id="descripcion" cols="15" rows="1" class="form-control" placeholder=" ..."></textarea>
						</div>

						<div class="form-group">
							<table>
								<tr>
									<td WIDTH="170">
										<label htmlFor="aspecto">Aspecto: </label>
										<select name="select" id="perfil" class="form-control">
											<option value="---" selected> ------------------ </option>
											<option value="Presentación" >Presentación</option>
											<option value="Desenvolvimiento">Desenvolvimiento</option>
											<option value="Dominio del tema">Dominio del tema</option>
										</select>
									</td>
									<td WIDTH="100"></td>
									<td>
										<label htmlFor="correo">Puntaje: </label>
										<input
											type="number"
											name="puntaje"
											placeholder="0"
											id="puntaje"
											min="0" 
											max="10"
										/>
									</td>
								</tr>
							</table>
						</div>
                    </ModalBody>
    
                    <ModalFooter>
                        
                        <button className="btn btn-success" >
                        Insertar
                        </button>
                        
        
                        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

            </div>
      )
    }
  
            
  
  }

  export default ModalCurso;