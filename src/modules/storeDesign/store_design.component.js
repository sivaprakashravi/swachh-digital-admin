import React from 'react';
import './store_design.style.scss';
import { MdPhonelinkSetup, MdColorLens, MdCheck } from 'react-icons/md';
import fetchServices from '../../services/fetchsvc.service';
import storage from '../../services/storage-manager.service';
import ReactDOM from 'react-dom';
import Toast from '../../components/toast/toast.component';
class Storedesign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: '#0984e3',
            mobile:'',
            tandc:'',
            data:{},
            tabs: [{
                label: 'Page',
                route: '',
                icon: <MdPhonelinkSetup size="24px" />,
                view: () => this.pageDesign(),
                enabled: false
            },
            {
                label: 'Theme',
                route: '',
                icon: <MdColorLens size="24px" />,
                view: () => this.themeDesign(),
                enabled: true
            }],
            themes: ['#0984e3', '#ff7675', '#6c5ce7', '#fdcb6e', '#00b894', '#00cec9']
        }
    };

componentDidMount(){
   this.getStoredesign();
}


async getStoredesign(){
try {
    const store = await storage.get('storeUser');
    const { StoreId } = store;
    const dataApi = await fetchServices.get(`api/getStoreDesign/${StoreId}`);
    this.setState({data:dataApi});
    this.setState({mobile:dataApi?.ContactUs,tandc:dataApi?.PrivacyPolicy,DocId:dataApi.DocId,theme:dataApi?.StoreTheme})
} catch (error) {
   console.log(error); 
}
}

   async addStoredesign(){
     try {
        const user = storage.get('userToken');
        const { localId } = user;
        const store = await storage.get('storeUser');
        const { StoreId } = store;
         const data = {
            "StoreId" : StoreId,
            "StoreTheme" : this.state.theme,
            "StorePolicy" : this.state.tandc,
            "ContactUs" : this.state.mobile,
            "CreatedBy" : localId,
            "ModifiedBy" : localId
         }
        const dataApi = await fetchServices.post('api/addStoreDesign',data);
        ReactDOM.render(<Toast message={dataApi} />, document.getElementById('dom'));
     } catch (error) {
        console.log(error); 
     }
}

async editStoredesign(){
    try {
        const {theme,DocId,tandc,mobile} = this.state;
        const user = storage.get('userToken');
        const { localId } = user;
        const editData={
            "DocId" : DocId,
            "StoreTheme" :theme,
            "StorePolicy" :tandc,
            "ContactUs" :mobile,
            "ModifiedBy" : localId
        }
        const dataApi = await fetchServices.post('api/editStoreDesign',editData);
        console.log(dataApi)
        ReactDOM.render(<Toast message={dataApi} />, document.getElementById('dom'));
    } catch (error) {
        console.log(error)
    }
}

handleChange(event, stateVariable) {
    this.setState({ [stateVariable]: event.target.value });
}

    tab() {
        const tabs = this.state.tabs.length;
        const selected = (tab) => {
            const selectionUpdated = this.state.tabs.map(t => {
                t.enabled = false;
                if(t.label === tab.label) {
                    t.enabled = true;
                }
                return t;
            });
            this.setState({tabs: selectionUpdated});
        }
        return (
            <div className="tabs">
                {  this.state.tabs.map((tab) => {
                    return (
                        <div className={tab.enabled ? 'active' : null} style={{ flex: `${100 / tabs}%` }} key={tab.label} onClick={() => selected(tab)}>
                            {tab.icon}
                            <label>{tab.label}</label>
                        </div>
                    )
                })}
            </div>
        )
    }

// renderPagescreen(){
//     const {data} =  this.state;
//     return(
//         data.length ? data.map((x,index)=> this.pageDesign(x,index)) : this.pageDesign()
//     )
// }

    pageDesign() {
        return (
            <div className="page" >
            <ul>
            <li>
             <label>Mobile :</label>
             <input type="text" value={this.state.mobile} maxLength={10} onChange={(e)=>this.handleChange(e, 'mobile')}/>
            </li>
            {/* <li>
            <label>Email :</label>
             <input type="text" onChange={(e)=>this.handleChange(e, 'email')}/> 
            </li> */}
            <li>
                <label>Terms & Conditions :</label>
            <textarea onChange={(e)=>this.handleChange(e, 'tandc')} value={this.state.tandc}/>
            </li>
            </ul>
        </div> 
        )
    }

    themeDesign() {
        return (
            <div className="theme">
                <h6>Select a theme for your store</h6>
                <ul>
                    {this.state.themes.map(t => {
                        return <li onClick={() => this.setState({theme: t})} key={t} style={{background: t}}>{this.state.theme === t ? <MdCheck fill="#fff" size="25px"/> : null}</li>
                    })}
                </ul>
            </div>
        )
    }

    design() {
        const tab =  this.state.tabs.find(t => t.enabled);
        return tab.view();
    }

    render() {
        const {data} =  this.state;
        return (
            <div className="store-design">
                {this.tab()}
                {this.design()}
                <div className="actions">
                    <button className="secondary">Cancel</button>
                    <button className="primary"  onClick={()=>data ? this.editStoredesign() : this.addStoredesign()}>Save</button>
                </div>
            </div>
        )
    }
};

export default Storedesign;