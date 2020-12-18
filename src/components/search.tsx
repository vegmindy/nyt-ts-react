import React, { Component } from 'react';
import SearchDisplay from './searchDisplay';

type FetchResults = {
    search: string,
    startDate: string,
    endDate: string,
    pageNumber: number,
    results: any,
};

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'tSChKTnL3mgFkvc4jc911uGPiGBFK1xY';

class DisplayResults extends Component<{}, FetchResults> {
    constructor(props: any) {
        super(props)
        this.state = {
            search: '',
            startDate: '',
            endDate: '',
            pageNumber: 0,
            results: [], 
        };
    }

    searchFunction(event: any) {
        this.setState({
            search: (event)
        })
    }
    setStartDate(event: any) {
        this.setState({
            startDate: (event)
        })
    }
    setEndDate(event: any) {
        this.setState({
            endDate: (event)
        })
    }

    fetchResults = () => {
        let url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`;

        if (this.state.startDate !== '') {    
            url += `&begin_date=${this.state.startDate}`
        
        }

        if (this.state.endDate !== '') {
            url += `&end_date=${this.state.endDate}`
        
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    results: data.response.docs
                })
            })
    }

    handleSubmit(event: any) {
        event.preventDefault()
        this.fetchResults()
    }

    nextPage(event: any){
        event.preventDefault()
        this.setState({
            pageNumber: this.state.pageNumber+1
        })
        this.fetchResults()
    }

    previousPage(event: any){
        event.preventDefault()
        if(this.state.pageNumber > 0) {
        this.setState({
            pageNumber: this.state.pageNumber-1
        })
        this.fetchResults()
    }
    }

    render() {
        return (
        <div className="main">
        <div className="mainDiv">
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>Search: </label>
                <input type ="text" name ="search" onChange ={(e) => this.setState({search: e.target.value})} />
                <br />
                <label>Start Date</label>
                <input type='date' onChange={(e) => this.setStartDate(e.target.value)} />
                <br />
                <label>End Date</label>
                <input type='date' onChange={(e) => this.setEndDate(e.target.value)} />
                <button type='submit'>Search</button>
                <hr />
                <SearchDisplay results={this.state.results} />
                <button onClick={(e)=> this.previousPage(e)}>Previous Page</button>
                <button onClick={(e)=> this.nextPage(e)}>Next Page</button>
            </form>
        </div>
        </div>
        );
    }
}

export default DisplayResults;