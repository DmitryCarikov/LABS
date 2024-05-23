import React, { Component } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      query: '',
      error: null,
      searched: false
    };
  }

  handleSearch = (query) => {
    this.setState({ query }, this.fetchImages);
  }

  updateQuery = (query) => {
    this.setState({query});
  }

  fetchImages = async () => {
    const { query } = this.state;
    if (!query.trim()) {
      this.setState({images: [], error: null, searched: false})
      return;
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=lvtII6A4uFr_d5ANAMUE94gBw7BQ73uYsMGiO4m04yA`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ images: data.results, error: null, searched: true });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  componentDidMount() {
    this.fetchImages();
  }

  render() {
    const { images, query, error, searched } = this.state;
    return (
      <div>
        <Header />
        <SearchBar onSearch={this.handleSearch} query={query} updateQuery={this.updateQuery} />
        {error && <div className="error">{error}</div>}
        {searched && images.length === 0 && !error && (
          <div className="no-images">Не найдено изображений по вашему запросу</div>
        )}
        {images.length > 0 && <ImageGallery images={images} />}
        <Footer />
      </div>
    );
  }
}

export default App;