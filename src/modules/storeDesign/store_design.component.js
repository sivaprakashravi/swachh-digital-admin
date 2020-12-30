import React from 'react';
import './store_design.style.scss';
import { MdPhonelinkSetup, MdColorLens, MdCheck } from 'react-icons/md';
import Pagescreen from './page/page.component'
class Storedesign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: '#0984e3',
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

    pageDesign() {
        return (
            <Pagescreen/>
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
        return (
            <div className="store-design">
                {this.tab()}
                {this.design()}
                <div className="actions">
                    <button className="secondary">Cancel</button>
                    <button className="primary">Save</button>
                </div>
            </div>
        )
    }
};

export default Storedesign;