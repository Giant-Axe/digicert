import React, { Component } from 'react';

class InstituteDashboard extends Component {

    constructor(props){
        super(props)
        this.state = {
            account:this.props.account,
            balance:this.props.balance,
            //datos de la institucion
            institute:{},
            //para añadir nuevos studiantes
            paddress:'',
            _name_student:'',
            _lastname_student:'',
            //para añadir certificados
            _title:'',
            ipfs_hash: '',
            //editar datos de la institucion
            _phone:0,
            _email:'',
            _web_page:'',
            //para consultar certificados
            certificate:{},
        };
    }

    async componentDidMount(){     
        this.setState({
            
        }, () => {
            this.load();//cargamos la aplicacion luego de obtener los elementos
        });
    }

    //metodo para obtener los datos de la insitutción
    async getInstituteData(){
        let institute = await this.props.cMethods.getInstituteData(this.state.account);
        this.setState({
            institute
        });
    }

    //metodo para editar los datos de la insitucion
    async editInstituteData(phone, email, web_page){
        await this.props.cMethods.editInstituteData(
            phone,
            email,
            web_page,
            this.state.account
        );
    }

    //metodo para añadir nuevos estudiantes
    async addNewStudents(address, name, lastName){
        await this.props.cMethods.addNewStudent(
            address, 
            name,
            lastName, 
            this.state.account
        );
    }
    //metodo para añadir nuevos certificados
    async addNewCertificates(address, title, ipfs_hash){
        await this.props.cMethods.addNewCertificate(
            address,
            title,
            ipfs_hash,
            this.state.account
        );
    }

    //metodo para realizar la consulta de certificados
    async askCertificateThird(address, ipfs_hash)
    {
        let certificate = await this.props.cMethods.askCertificateThird(
            address,
            ipfs_hash,
            this.state.account
            )
        this.setState({
             certificate
        });
        console.log(certificate);
    }

    //metodo para cargar los componentes de manera local
    async load(){
        this.getInstituteData();
    }

    //metodo para sincronizar los imputs con el estado del componente
    syncFormsChanges(value,property){
        let state = {};
        state[property] = value; 
        this.setState(state);
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <div className="navbar-fixed">
                        <nav className="cyan darken-2">
                            <div className="nav-wrapper container">
                                <div className="brand-logo left" style={{paddingLeft: "20px"}}>DigiCert</div>
                                {/* <div className="right"><a href="#!" className="waves-effect waves-green btn black">SALIR</a></div> */}
                            </div>
                            <div className="nav-wrapper cyan darken-3">
                                <div className="container">
                                    <a href="#!" style={{marginLeft: "20px"}} className="breadcrumb sidenav-trigger" data-target="menu-side"><i className="material-icons">menu</i></a>
                                    <a href="#!" className="breadcrumb">Escritorio</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="container section">
                        <ul className="sidenav sidenav-fixed" id="menu-side">
                            <li>
                                <div className="user-view">
                                    <div className="background cyan darken-2">
                                    </div>
                                    <a href="#!">
                                        <i className="material-icons large icon-navbar">account_balance</i>
                                    </a>
                                    <a href="#!">
                                        <span className="white-text"><b>Institución</b></span>
                                        <span className="name white-text"><b>Cuenta: </b>{this.state.account}</span>
                                        <span className="name white-text"><b>Balance: </b>{this.state.balance} Ether</span>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <a href="#d_institute" className="waves-effect waves-teal"><i className="material-icons sidenav-close">account_balance</i>Datos de la Institución</a>
                            </li>
                
                            <li>
                                <div className="divider"></div>
                            </li>

                            <li>
                                <a href="#a_student" className="waves-effect waves-teal"><i className="material-icons sidenav-close">school</i>Añadir Estudiante</a>
                            </li>

                            <li>
                                <div className="divider"></div>
                            </li>

                            <li>
                                <a href="#e_certificate" className="waves-effect waves-teal"><i className="material-icons sidenav-close">description</i>Emitir Certificado</a>
                            </li>
                            <li>
                                <div className="divider"></div>
                            </li>

                            <li>
                                <a href="#c_certificate" className="waves-effect waves-teal"><i className="material-icons sidenav-close">check</i>Consultar Certificado</a>
                            </li>
                            <li>
                                <div className="divider"></div>
                            </li>

                            <li>
                                <a href="#e_institute" className="waves-effect waves-teal"><i className="material-icons sidenav-close">mode_edit</i>Editar Datos de la Institución</a>
                            </li>
                            
                            <li>
                                <div className="divider"></div>
                            </li>

                            {/* <li>
                                <a href="#!" className="waves-effect waves-red"><i className="material-icons">settings_power</i>SALIR</a>
                            </li> */}
                        </ul>
                    </div>
                </header>

                <main>

                    <div className="container">
                        <div id="d_institute" className="row scrollspy">
                            <div className="col s12">
                                <div style={{padding: "35px"}} align="center" className="card">
                                    <div className="row">
                                        <div className="left card-title">
                                            <b>Datos de la Institución</b>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="row">
                                        <ul>
                                            <li>
                                                <span><b>Nonbre de la Institución: </b>{this.state.institute.name_organization}</span>
                                            </li>
                                            <li>
                                                <span><b>Teléfono: </b>{this.state.institute.phone}</span>
                                            </li>
                                            <li>
                                                <span><b>Correo Electrónico: </b>{this.state.institute.email}</span>
                                            </li>
                                            <li>
                                                <span><b>Página Web: </b>{this.state.institute.web_page}</span>
                                            </li>
                                            <li>
                                                <span><b>Número de Certificados Emitidos: </b>{this.state.institute.qt_certificates_issued}</span>
                                            </li>
                                            <li>
                                                <span><b>Fecha de Creación: </b>{this.state.institute.added_timestamp}</span>
                                            </li>
                                            <li>
                                                <span><b>Última Actualización: </b>{this.state.institute.updated_timestamp}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="a_student" className="row scrollspy">
                            <div className="col s12">
                                <div style={{padding: "35px"}} align="center" className="card">
                                    <div className="row">
                                        <div className="left card-title">
                                            <b>Añadir Estudiante</b>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="row">
                                        <form action="" className="col s12">
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">public</i>
                                                    <input 
                                                        onChange = {(ev) => {this.syncFormsChanges(ev.target.value, 'paddress')}}
                                                        id="institute_addres" 
                                                        type="text" 
                                                        className="validate" 
                                                        value={this.state.paddress}
                                                    />
                                                    <label htmlFor="institute_addres">Direccion Pública del Estudiante</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">account_circle</i>
                                                    <input 
                                                    onChange = {(ev) => {this.syncFormsChanges(ev.target.value,'_name_student')}}
                                                    id="institute_name" 
                                                    type="text" 
                                                    className="validate"
                                                    value={this.state._name_student}
                                                    />
                                                    <label htmlFor="institute_name">Nombre del Estudiante</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">account_circle</i>
                                                    <input 
                                                    onChange = {(ev) => {this.syncFormsChanges(ev.target.value, '_lastname_student')}}
                                                    id="institute_name" 
                                                    type="text" 
                                                    className="validate"
                                                    value={this.state._lastname_student} 
                                                    />
                                                    <label htmlFor="institute_name">Apellido del Estudiante</label>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => this.addNewStudents(this.state.paddress,this.state._name_student, this.state._lastname_student)}
                                                className="btn waves-effect waves-light" type="submit">Enviar
                                                <i className="material-icons right">send</i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="e_certificate" className="row scrollspy">
                            <div className="col s12">
                                <div style={{padding: "35px"}} align="center" className="card">
                                    <div className="row">
                                        <div className="left card-title">
                                            <b>Emitir Certificado</b>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="row">
                                        <form action="" className="col s12">
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">public</i>
                                                    <input
                                                        onChange = {(ev) => {this.syncFormsChanges(ev.target.value, 'paddress')}}
                                                        id="student_address" 
                                                        type="text" 
                                                        className="validate"
                                                        value={this.state.paddress}
                                                    />
                                                    <label htmlFor="student_address">Direccion Pública del Estudiante</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">school</i>
                                                    <input 
                                                        onChange = {(ev) => {this.syncFormsChanges(ev.target.value, '_title')}}
                                                        id="student_title" 
                                                        type="text" 
                                                        className="validate"
                                                        value={this.state._title}
                                                    />
                                                    <label htmlFor="student_title">Título del Certificado</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">widgets</i>
                                                    <input 
                                                        onChange = {(ev) => {this.syncFormsChanges(ev.target.value, 'ipfs_hash')}}
                                                        id="certificate_hash" 
                                                        type="text" 
                                                        className="validate" 
                                                        value={this.state.ipfs_hash}
                                                    />
                                                    <label htmlFor="certificate_hash">Hash IPFS del Certificado</label>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => this.addNewCertificates(this.state.paddress,this.state._title,this.state.ipfs_hash)}
                                                className="btn waves-effect waves-light" type="submit">Enviar
                                                <i className="material-icons right">send</i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="c_certificate" className="row scrollspy">
                            <div className="col s12">
                                <div style={{padding: "35px"}} align="center" className="card">
                                    <div className="row">
                                        <div className="left card-title">
                                            <b>Consultar certificado</b>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="row">
                                        <form action="" className="col s12">
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">public</i>
                                                    <input 
                                                        onChange = { (ev) => {
                                                            this.syncFormsChanges(ev.target.value, 'paddress')
                                                        }}
                                                        id="institute_name" 
                                                        type="text" 
                                                        className="validate"
                                                        value = {this.state.paddress}
                                                    />
                                                    <label htmlFor="institute_name">Direccion Pública del Estudiante</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">widgets</i>
                                                    <input
                                                        onChange = { (ev) => {
                                                            this.syncFormsChanges(ev.target.value, 'ipfs_hash')
                                                        }}
                                                        id="institute_addres" 
                                                        type="text" 
                                                        className="validate"
                                                        value={this.state.ipfs_hash}
                                                    />
                                                    <label htmlFor="institute_addres">Hash IPFS del Certificado</label>
                                                </div>
                                            </div>
                                            <button
                                                onClick = { () => this.askCertificateThird(this.state.paddress, this.state.ipfs_hash)}
                                                className="btn waves-effect waves-light" type="submit">Enviar
                                                    <i className="material-icons right">send</i>
                                            </button>
                                        </form>
                                    </div>
                                </div>   
                            </div>
                        </div>
                        <div id="e_institute" className="row scrollspy">
                            <div className="col s12">
                                <div style={{padding: "35px"}} align="center" className="card">
                                    <div className="row">
                                        <div className="left card-title">
                                            <b>Editar Datos</b>
                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="row">
                                        <form action="" className="col s12">
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">local_phone</i>
                                                    <input
                                                        onChange = {(ev) => {this.syncFormsChanges(ev.target.value, '_phone')}}
                                                        id="institute_name" 
                                                        type="text" 
                                                        className="validate"
                                                        value={this.state._phone}
                                                    />
                                                    <label htmlFor="institute_name">Teléfono</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">email</i>
                                                    <input 
                                                        onChange = {(ev) => {this.syncFormsChanges(ev.target.value, '_email')}}
                                                        id="institute_addres" 
                                                        type="text" 
                                                        className="validate"
                                                        value={this.state._email} 
                                                    />
                                                    <label htmlFor="institute_addres">Correo Electrónico</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <i className="material-icons prefix">language</i>
                                                    <input 
                                                        onChange = {(ev) => {this.syncFormsChanges(ev.target.value, '_web_page')}}
                                                        id="institute_addres" 
                                                        type="text" 
                                                        className="validate"
                                                        value = {this.state._web_page} 
                                                    />
                                                    <label htmlFor="institute_addres">Página Web</label>
                                                </div>
                                            </div>
                                            <button 
                                                onClick = { () => this.editInstituteData(this.state._phone, this.state._email, this.state._web_page)}
                                                className="btn waves-effect waves-light" 
                                                type="submit">Enviar
                                                <i className="material-icons right">send</i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default InstituteDashboard;