var Child = React.createClass({

  loadChild: function(){
    this.props.toggleChild(this.props.id);
  },

  render: function(){
    return(<div className='col s4'>
              <div className='card grey lighten-3 hoverable'>
                <div className='card-content blue-text text-darken-3' onClick={this.loadChild}>
                  <span className='card-title'>{this.props.name}</span>
                </div>
                <div className='card-action'>
                  <a onClick={() => this.props.deleteChild(this.props.id)}>Delete</a>
                </div>
              </div>
           </div>);
  }
});