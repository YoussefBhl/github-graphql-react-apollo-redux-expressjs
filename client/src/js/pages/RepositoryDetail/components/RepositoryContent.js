import React from 'react';
import { Glyphicon, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Query } from 'react-apollo';
import { githubQueries } from '../queries';
import { history } from '../../../common/history';

export default class RepositoryContent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          path: this.props.path,//path passed to query
          firstPage: this.props.firstPage,  //shows ".."
        };
      }
      /*called when user click on ".." (return to prev page)*/
      handlepreviousPAge = () =>{
        let path = this.state.path,
        pathSlice = [],
        deletedStr = "",
        firstPage = this.state.firstPage;
        /*we choose the path based of the prev path
        the path will passed to graphql like this pattern master:src/compentents
        so we need to define if we are returning to the first page*/
        if(path.indexOf("/") != -1){
            pathSlice= path.split("/");
            deletedStr = "/"+pathSlice[pathSlice.length-1];
        }
        else{
            pathSlice= path.split(":");
            deletedStr = pathSlice[pathSlice.length-1];
        }
        path = path.replace(deletedStr, "");
        //change the firstpage
        if(path == this.props.path)  firstPage = true;
        this.setState({path, firstPage})
      }
      /*called when user choose repo other then ".."*/

      handleSelectRepo = (selectedRepo) => {
       let path = this.state.path,
        firstPage = this.state.firstPage;
       if(firstPage){
           path += selectedRepo;
       }
       else path += "/" + selectedRepo;
       //let pathSlice= path.slice("/");
       this.setState({path, firstPage:false})
      }
  render() {
    let prevDir = null;
    const owner= this.props.owner,
        repoName = this.props.repoName,
        path = this.state.path;
    if(!this.state.firstPage)  
        prevDir = <tr>
                    <td>
                    <a href="#" onClick={(e) => { 
                                    e.preventDefault();
                                    this.handlepreviousPAge()
                                    }}>..</a>
                    </td>
                </tr>

    return (
        <Query query={githubQueries.getRepositoryContents}
          variables={{ repoName, path, owner }} >
          {({ data, loading, error, fetchMore }) => {
            const { viewer } = data
            if (loading && !viewer) {
              return null;
            }
            if (error) {
              return <p>
                error:
                        {error}
              </p>
            }
            let contents = data.repository.object.entries.map((el) => el);
            contents = contents.sort((a, b) => {
                if (b.type == "tree") return 1;
                if (a.type == "tree") return -1;
                return 0;
            });
            return (
                <Table striped bordered condensed hover>
                <thead>
                    <tr>
                    <th>#</th>
                    </tr>
                </thead>
                <tbody>
                {prevDir}
                    {
                    contents.map((el, i) => {
                        if (el.type == "tree") {
                        return (
                            <tr key={i}>
                            <td>
                                <Glyphicon glyph="folder-close" /> &nbsp;
                                <a href="#" onClick={(e) => { 
                                    e.preventDefault();
                                    this.handleSelectRepo(el.name)
                                    }}>{el.name}</a>
                            </td>
                            </tr>
                        )
                        }
                        return (
                        <tr key={i}>
                            <td>
                            <Glyphicon glyph="file" /> &nbsp;{el.name}
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
                </Table>
            )
          }}
        </Query>
        
    )
  }
}
