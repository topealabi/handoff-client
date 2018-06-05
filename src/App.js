import React, { Component } from 'react';
import './App.css';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {senderEmail: '',
      senderAddress: '',
      secretData: '',
      recieverEmail: '',
      recieverAddress: '',
      isEncrypted: false,
      encryptedSecretData: ''
    }
    this.privateKey = "0x7f2e0a903b5e5fdee8458987386ca23c3f2db7d07eae02d3c2e6e5c6f17599a0"
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + JSON.stringify(this.state));

    event.preventDefault();
    
  }
//encrypt: async function (senderprivateKey, recieverPublicKey, msgParams)

  
  handleClick(event) {
    const edata = {privateKey: "0x7f2e0a903b5e5fdee8458987386ca23c3f2db7d07eae02d3c2e6e5c6f17599a0",
    recieverKey: "44be5ff4da3cc349f101b0cb189887a55b05efc2ed97ab3054d2a16c19ca488685c70fa48556ef3d6d5342cd996ba4b41df4214947ca5ecf6324b9bc39fa5246",
    msgparams: {data: "My name is Satoshi Buterin"}
    }

    const data = fetch('http://localhost:5000/messages/create', {
      method: 'POST',
      body: edata
    });

    console.log(data)
    
    this.setState({encryptedSecretData : data});
    this.setState(prevState => ({
      isEncrypted: !prevState.isEncrypted
    }))
  }


  render() {
    return (
      <div className="container">
    <div className="row">
      <div className="col-sm-12 text-center">
        <h1>Handoff</h1>
        <p>A simple dapp for passing around sensitive information.</p>
        <br/>
        <br/>
        
          <form onSubmit={this.handleSubmit}>
            <div className="col-xs-12 col-sm-6  col-md-6 " style={{borderRight: '1px solid black'}}>
              <div className="form-group">
                <label htmlFor="ownerEmail">Your Email Address</label>
                <input type="email" value={this.state.senderEmail} onChange={this.handleChange} placeholder="your@email.com" className="form-control" id="ownerEmail" name="senderEmail"  />
              </div>
              <div className="form-group">
                <label htmlFor="ownerAddress">Your Ethereum Public Address</label>
                <input type="text" value={this.state.senderAddress}  onChange={this.handleChange} placeholder="0x9F15e05..." className="form-control" id="ownerAddress" name="senderAddress" />
              </div>
              
              <div className="form-group">
                <label htmlFor="ownerPrivateKey">Your secret data</label>
                <textarea disabled={this.state.isEncrypted} rows="4"  value={this.state.secretData} onChange={this.handleChange} placeholder="shhh..." className="form-control" id="ownerPrivateKey" name="secretData" ></textarea>
                <small className="form-text tex-muted" style={{marginBottom: '5px'}}>This is the info that your beneficiary will recieve. Could also be your private key.</small>
                
                
              </div>
            </div>
            <div className="col-xs-12 col-sm-6  col-md-6 ">
              <div className="form-group">
                <label htmlFor="beneficiaryEmail">Beneficiary's Email Address</label>
                <input type="email" value={this.state.recieverEmail} onChange={this.handleChange} placeholder="them@email.com" className="form-control" id="beneficiaryEmail" name="recieverEmail"  />
              </div>

              <div className="form-group">
                <label htmlFor="beneficiaryAddress">Beneficiary's Ethereum Public Address</label>
                <input type="text" value={this.state.recieverAddress} onChange={this.handleChange} placeholder="0xfBfA195..." className="form-control" id="beneficiaryAddress" name="recieverAddress"  /> 
              </div>

              
              <div className="form-group" style={{display: this.state.isEncrypted ? 'inline' : 'none'}}>
                <label htmlFor="ownerPrivateKey">Encrypted data</label>
                <textarea rows="4"  value={this.state.secretData} onChange={this.handleChange} placeholder="shhh..." className="form-control" id="ownerPrivateKey" name="encryptedSecretData" ></textarea>
                
                
                
              </div>
            </div>
            <div className="col-xs-12">
              <button className="btn btn-warning pull-right" type="button" style={{display: this.state.isEncrypted ? 'none' : 'inline'}} onClick={this.handleClick}> Encrypt <span className="fas fa-lock"></span></button>
              <div className="pull-right">
                <button className="btn " style={{display: this.state.isEncrypted ? 'inline' : 'none'}} type="submit"> Cancel </button>
                <button className="btn btn-success pull-right" style={{display: this.state.isEncrypted ? 'inline' : 'none'}} type="submit"> Submit <span className="far fa-check-circle"></span></button>
              
              </div>
              
            </div>
            
          </form>
        
        
      </div>
      
    </div>
  </div>
    );
  }

}

class App extends Component {
  render(){
    return(
    <Form/>
  )
  }
  
}

export default App;
