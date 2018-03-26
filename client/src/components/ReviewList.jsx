import React from 'react';
import Navigation from './Navigation';
import IndividualReview from './IndividualReview';

export default class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      names: this.props.reviews.guest_name,
      dates: this.props.reviews.date,
      images: this.props.reviews.image,
      reviews: this.props.reviews.message,
      displayedGuestNames: this.props.reviews.guest_name,
      displayedReviews: this.props.reviews.message,
      displayedDates: this.props.reviews.date,
      displayedImages: this.props.reviews.image
    };
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
    // this.renderIndividualReviews = this.renderIndividualReviews();
  }

  updateCurrentPage(newPage) {
    this.setState({ currentPage: newPage }, () => {
      this.updateDisplayedReview();
    });
  }

  updateDisplayedReview() {
    const startIndex = (this.state.currentPage - 1) * 7;
    const endIndex = startIndex + 7;
    this.setState({
      displayedGuestNames: this.state.names.slice(startIndex, endIndex),
      displayedReviews: this.state.reviews.slice(startIndex, endIndex),
      displayedDates: this.state.dates.slice(startIndex, endIndex),
      displayedImages: this.state.images.slice(startIndex, endIndex)
    });
  }

  renderIndividualReviews() {
    const individualReviewArray = [];
      individualReviewArray.push(
        <IndividualReview
          username={this.state.displayedGuestNames}
          reviewDate={this.state.displayedDates}
          image={this.state.displayedImages}
          message={this.state.displayedReviews}
        />
      );
    return individualReviewArray;
  }

  render() {
    console.log(`review list passing down ${this.renderIndividualReviews()[0]}`)
    return (
      <div id="review">
        {this.renderIndividualReviews()}
        <Navigation
          pages={Math.ceil(this.state.reviews / 7)}
          clickHandler={this.updateCurrentPage}
        />
      </div>
    );
  }
}
/* 
displayedReviews: {
  reviews: this.state.reviews.message.slice(startIndex, endIndex),
  dates: this.state.reviews.date.slice(0, 7),
  images: this.state.reviews.image.slice(0, 7)
} */

/* 
dates: this.state.dates.slice(startIndex, endIndex),
images: this.props.reviews.image.slice(startIndex, endIndex), */

/* 
{this.state.displayedReviews.map(review => (
  <IndividualReview review={review} key={review.id} />
))} */
