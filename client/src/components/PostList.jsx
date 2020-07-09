import React from 'react';

import { ListGroup, ListGroupItem } from 'reactstrap';
import PostItem from 'components/PostItem.jsx';
import './PostList.css';

export default class PostList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let content = (
            <ListGroupItem className="empty">
                    <div className="empty-post text-info">No Posts. Go add some posts.</div>
            </ListGroupItem>
        );
        //console.log("posts.length: " + this.props.posts.length);
        if(this.props.posts.length){
            content =  this.props.posts.map((post) => {
                return (<ListGroupItem key={post.id} action>
                    <PostItem {...post} onVote={this.handleVote}/>
                </ListGroupItem>);
            })
        }
        //console.log(content);

        return (
            <div className="post-list container mt-4">
                <ListGroup>
                    {content}
                </ListGroup>
            </div>
        );
    }

}