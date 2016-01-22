var Lists = React.createClass({
  
  getInitialState: function() {
    return {lists: []}
  },

  componentDidMount: function() {
    this.fetchLists();
  },

  fetchLists: function() {
    var self = this;
    $.ajax({
      url: '/lists',
      type: 'GET',
      data: {id: this.props.childId},
      success: function(data) {
        self.setState(data);
      }
    });
  },

  submitList: function(e) {
    e.preventDefault();
    var self = this;
    $.ajax({
      url: '/lists',
      type: 'POST',
      data: {id: this.props.childId, list: {name: this.refs.listName.value}},
      success: function(data) {
        var lists = self.state.lists;
        var key = 'list-' + data.id;
        lists.push(data);
        self.refs.listName.value = '';
        self.setState({lists: lists, showAdd: false});
      }
    });
  },

  addListForm: function(){
    if(this.state.showAdd) {
      return(<div>
              <form onSubmit={this.submitList}>
                <div className='input-field'>
                  <input type='text' placeholder='List Name' autoFocus='true' ref='listName' />
                  <button type='submit' className='btn-flat hoverable'>Add</button>
                </div>
              </form>
             </div>)
    }
  },

  showAddForm: function() {
    this.setState({showAdd: !this.state.showAdd});
  },

  displayLists: function() {
    var lists = [];
    for(var i = 0; i < this.state.lists.length; i++){
      var list = this.state.lists[i];
      var key = 'list-' + list.id;
      lists.push(<List key={key} id={list.id} name={list.name} />);
    }
    return lists;
  },

  render: function(){
    return(<div>
            <a className='btn-flat hoverable' onClick={this.props.toggleChild}>Children</a>
            <a className='btn-flat hoverable' onClick={this.showAddForm}>Add List</a>
            {this.addListForm()}
            <div className='row'>
              {this.displayLists()}
            </div>
           </div>);
  }
});