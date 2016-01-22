var List = React.createClass({
  getInitialState: function() {
    return {items: []};
  },
  
  componentDidMount: function() {
    this.refreshList();
  },

  refreshList: function() {
    var self = this;
    $.ajax({
      url: '/items',
      type: 'GET',
      data: {list_id: this.props.id},
      success: function(data) {
        self.setState({items: data.items});
      }
    });
  },
  
  showAddForm: function() {
    this.setState({showAdd: !this.state.showAdd});
  },

  addItemName: function(e){
    this.setState({itemName: e.currentTarget.value});
  },

  submitItem: function(e){
    e.preventDefault();
    var self = this;
    $.ajax({
      url: '/items',
      type: 'POST',
      data: {list_id: this.props.id, item: {name: this.state.itemName}},
      success: function(data) {
        var items = self.state.items;
        items.push(data);
        self.setState({items: items, showAdd: false, itemName: null});
      }

    });
  },

  addItemForm: function() {
    if(this.state.showAdd){
      return(<div>
              <form onSubmit={this.submitItem}>
                <div className='input-field'>
                  <input autoFocus='true' placeholder='Item Name' type='text' onChange={this.addItemName} />
                  <button className='btn waves-effect' type='submit'>Save</button>
                </div>
              </form>
             </div>);
    }
  },

  displayItems: function() {
    var items = [];
    for(var i = 0; i < this.state.items.length; i++){
      var item = this.state.items[i];
      var key = "Item-" + item.id;
      items.push(<Item listId={this.props.id} refreshList={this.refreshList} key={key} url={item.url} id={item.id} name={item.name} complete={item.complete} />);
    }
    return items;
  },

  render: function() {
    return(<div>
            <div className='row'>  
              <div className='card grey lighten-3 col s10 offset-s1'>
              <a className='btn-flat hoverable' onClick={this.showAddForm}>Add Item</a>
              {this.addItemForm()}
                <div className='card-content blue-text text-darken-3'>
                  <span className='card-title'>{this.props.name}</span>
                  <ul>
                  {this.displayItems()}
                  </ul>
                </div>
              </div>
            </div>
           </div>);
  }
});