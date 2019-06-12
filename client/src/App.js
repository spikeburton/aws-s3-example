import React, { Component } from 'react';

const API = 'http://localhost:4000';

export default class App extends Component {
  state = {
    loading: false,
    url: ''
  };

  handleUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    this.setState({ loading: true });

    fetch(`${API}/s3/direct_post`)
      .then(res => res.json())
      .then(payload => {
        const url = payload.url;
        const formData = new FormData();

        Object.keys(payload.fields).forEach(key =>
          formData.append(key, payload.fields[key])
        );
        formData.append('file', file);

        fetch(url, {
          method: 'POST',
          body: formData
        })
          .then(res => res.text())
          .then(xml => {
            const imageURL = new DOMParser()
              .parseFromString(xml, 'application/xml')
              .getElementsByTagName('Location')[0].textContent;

            this.setState({
              loading: false,
              url: imageURL
            });
          });
      });
  };

  render() {
    return (
      <div>
        <div id="image-box">
          <h4>Select Image</h4>
        </div>
        <input
          type="file"
          hidden
          ref={el => (this.img = el)}
          onChange={this.handleUpload}
        />
        <button onClick={() => this.img.click()}>Choose File</button>
      </div>
    );
  }
}
