var Item = React.createClass({
  
  getInitialState: function() {
    return { edit: false };
  },

  toggleEdit: function() {
    this.setState({ edit: !this.state.edit });
  },

  checkItem: function() {
    var self = this;
    $.ajax({
      url: '/check_item',
      type: 'PUT',
      data: { item: { complete: !this.props.complete}, id: this.props.id },
      success: function() {
        self.props.refreshList();
      }
    });
  },

 
  updateItem: function(e) {
    e.preventDefault();
    var name = ReactDOM.findDOMNode(this.refs.itemName).value;
    var self = this;
    $.ajax({
      url: this.props.url,
      type: 'PUT',
      data: { item: { name: name }},
      success: function() {
        self.setState({edit: false});
        self.props.refreshList();
      }
    });
  },

  deleteItem: function() {
    var self = this;
    $.ajax({
      url: this.props.url,
      type: 'DELETE',
      success: function() {
        self.props.refreshList();
      }
    });
  },

  edit: function() {
    return( <li>
              <div className='row'>
                <div className='col s10'>
                  <form onSubmit={this.updateItem}>
                    <input autoFocus={true} type='text' defaultValue={this.props.name} ref='itemName' />
                  </form>
                </div>
                <div className='col s2'>
                  <a onClick={this.toggleEdit}>Cancel</a>
                </div>
              </div>
            </li>);
  },

 item: function(){
  var id = 'item-' + this.props.id;
  var checked = this.props.complete ? 'checked' : '';
  var itemClass = 'col s9 ' + checked;
  return(<li>
            <div className='row'>
              <div onClick={this.toggleEdit} className={itemClass}>
                {this.props.name}
              </div>
              <div onClick={this.checkItem} className='col s1'>
                <input type='checkbox' id={id} defaultChecked={this.props.complete} />
                <label htmlFor={id}></label>
              </div>
              <div onClick={this.deleteItem} className='hoverable col s1'>
                delete
              </div>
            </div>
          </li>); 
  },


  render: function() {
    if(this.state.edit) {
      return this.edit();
    } else {
      return this.item();
    }
  }
});