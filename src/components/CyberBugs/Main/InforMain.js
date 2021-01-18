import React from 'react';
import ReactHtmlParser  from 'react-html-parser';
export default function InforMain(props) {

    const renderMember = () => {
       return props.members?.map((item, index) => {
            return <div className="avatar" key = {index}>
            <img src={item.avatar} alt="hinhAnh" />
        </div>
        })
    }

    return (
        <>
     
             <h3>{props.projectName}</h3>
                <div>
                   <h5>{ReactHtmlParser(props.description)}</h5> 
                </div>
                    <div className="info" style={{ display: 'flex' }}>
                        <div className="search-block">
                            <input className="search" />
                            <i className="fa fa-search" />
                        </div>
                        <div className="avatar-group" style={{ display: 'flex' }}>
                           {renderMember()}
                        </div>
                        <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                        <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
                    </div>
        </>
    )
}
