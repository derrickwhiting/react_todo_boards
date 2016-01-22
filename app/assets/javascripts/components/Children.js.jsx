var Children = React.createClass({

  getInitialState: function(){
    return {children: this.props.children}
  },

  getDefaultState: function(){
    return {children: []}
  },

  addChild: function(e){
    e.preventDefault();
    var self = this;

    $.ajax({
      url: '/children',
      type: 'POST',
      data: {child: {name: this.refs.childName.value}},
      success: function(data){
        var children = self.state.children;
        children.push(data);
        self.refs.childName.value = '';
        self.setState({children: children});
      }

    });
  },

  deleteChild: function(id){
    var self = this;
    $.ajax({
      url: '/children/' + id,
      type: 'DELETE',
      success: function(data){
        self.setState({children: data});
      }
    });
  },

  toggleChild: function(id){
    this.setState({childId: id, listView: !this.state.listView});
  },

  displayChildren: function(){
    if(this.state.children.length) {
      var children = [];
      for(var i = 0; i < this.state.children.length; i++){
        var child = this.state.children[i];
        var key = 'child-' + child.id;
        children.push(<Child toggleChild={this.toggleChild} key={key} id={child.id} name={child.name} deleteChild={this.deleteChild} />);
      }
      return children;
    } else {
      return(<h5 className='blue-text'>No children found. Please add one</h5>);
    }

  },

  showChildren: function() {
    return(<div>
            <form onSubmit={this.addChild}>
              <div className='row'>  
                <div className='input-field card hoverable col s4'>
                  <input required='true' type='text' autoFocus='true' placeholder='Child Name' ref='childName' />
                  <button type='submit' className='btn-flat hoverable'>Add</button>
                </div>
              </div>
            </form>
            <div className='row'>
              {this.displayChildren()}
            </div>
           </div>);
  },

  showChildrenLists: function() {
    return(<Lists childId={this.state.childId} toggleChild={this.toggleChild} />)
  },

  render: function(){
    if(this.state.listView)
      return this.showChildLists();
    else
      return this.showChildren();
  }
});