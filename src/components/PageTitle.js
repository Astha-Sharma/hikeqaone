import React from 'react';


class PageTitle extends React.Component {

    render() {
        return (
            <div className={'page-header-block ' + this.props.className}>
                <div className="head-row clearfix">
                     {this.props.title && <div className={"inline-block page-title "+ this.props.titleStyle}>{this.props.title}</div>}
                     {this.props.subTitle && <div className="inline-block page-subTitle">{this.props.subTitle}</div>}
                         <div className="page-action pull-right">
                             {this.props.rightRender && <div className="inline-block" >{this.props.rightRender()}</div> }
                              {this.props.actionList}

                         </div>

                </div>
                {this.props.children}
            </div>
        )
    }
}


export default PageTitle;