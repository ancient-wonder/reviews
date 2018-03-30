import React from 'react';
import ReactDOM from 'react-dom';
import ReviewList from './ReviewList';
import Score from './Score.jsx';
import HeaderBar from './HeaderBar';
import BlankSearch from './BlankSearch.jsx';
import SearchPage from './SearchPage';
import axios from 'axios';
import $ from 'jquery';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      searchResultsArray: null,
      accuracy: 0,
      communication: 0,
      checkin: 0,
      value: 0,
      cleaniness: 0,
      location: 0,
      totalReviews: 0,
      hasSearched: false,
      searchTerm: null
    };
    this.clearSearch = this.clearSearch.bind(this);
    this.searchReviews = this.searchReviews.bind(this);
  }

  async retrieveMetaData() {
    let id =
      this.props.id || parseInt(window.location.pathname.split('/')[2], 10);
    const retrieved = await axios.get(
      `http://18.144.49.228:3004/reviews/${id}/reviews`
    );
    console.log(retrieved);
    await this.setState(
      {
        reviews: retrieved.data[0].reviews,
        totalReviews: retrieved.data[0].product_id,
        accuracy: retrieved.data[0].reviews.accuracy,
        communication: retrieved.data[0].reviews.communication,
        checkin: retrieved.data[0].reviews.checkin,
        value: retrieved.data[0].reviews.value,
        cleaniness: retrieved.data[0].reviews.cleaniness,
        location: retrieved.data[0].reviews.location
      },
      () =>
        console.log(
          `current objects have this ==> ${this.state.reviews}`
        )
    );
  }

  clearSearch() {
    this.setState({ searchResultsArray: null, searchTerm: null });
    $(':input').val('');
  }

  componentDidMount() {
    this.retrieveMetaData();
  }

  /*  this.state.reviews.filter(db => {
    if (db.reviews.message.toLowerCase().includes(queryString.toLowerCase())) {
      reviewArr.push(db);
    }
  }); */

  searchReviews(queryString) {
    this.setState({ searchTerm: queryString });
    const reviewObj = {
      message: [],
      guest_name: [],
      date: [],
      image: []
    };
    this.state.reviews.message.filter((message, messageIdx) => {
      if (message.toLowerCase().includes(queryString.toLowerCase())) {
        reviewObj.message.push(message);
        reviewObj.guest_name.push(this.state.reviews.guest_name[messageIdx]);
        reviewObj.date.push(this.state.reviews.date[messageIdx]);
        reviewObj.image.push(this.state.reviews.image[messageIdx]);
      }

    });
    console.log('review ==>', reviewObj)
    this.setState({ searchResultsArray: reviewObj });
  }

  render() {
    if (this.state.searchResultsArray && this.state.searchTerm) {
      console.log(this.state.searchResultsArray);
      return (
        <div className="searchreviews">
          <div className="header-toplevel">
            <HeaderBar totalReviews={this.state.totalReviews} />

            <BlankSearch search={this.searchReviews} />
          </div>
          <div className="searching">
            <SearchPage
              clearSearch={this.clearSearch}
              queryString={this.state.searchTerm}
              numberOfResults={this.state.searchResultsArray.length}
            />
          </div>

          <ReviewList reviews={this.state.searchResultsArray} />
        </div>
      );
    } else if (this.state.reviews) {
      return (
        <div className="reviews">
          <div className="header-toplevel">
            <HeaderBar totalReviews={this.state.totalReviews} />

            <BlankSearch search={this.searchReviews} />
          </div>
          <div className="scorecard">
            <Score
              accuracy={this.state.accuracy}
              communication={this.state.communication}
              value={this.state.value}
              location={this.state.location}
              cleaniness={this.state.cleaniness}
              checkin={this.state.checkin}
            />
          </div>

          <div id="messages">
            <div>
              <ReviewList reviews={this.state.reviews} />
            </div>
          </div>
        </div>
      );
    }
    return <div>Loading....</div>;
  }
}
