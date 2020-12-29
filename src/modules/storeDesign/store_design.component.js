import React from 'react';
import './store_design.style.scss';
import { MdPhonelinkSetup, MdColorLens } from 'react-icons/md'
class Storedesign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [{
                label: 'Page',
                route: '',
                icon: <MdPhonelinkSetup size="24px" />,
                view: this.pageDesign,
                enabled: true
            },
            {
                label: 'Theme',
                route: '',
                icon: <MdColorLens size="24px" />,
                view: this.themeDesign,
                enabled: false
            }]
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
            <div>page design</div>
        )
    }

    themeDesign() {
        return (
            <div>theme design</div>
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
            </div>
        )
    }
};

export default Storedesign;