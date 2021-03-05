import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lastSearch } from "./redux/actions/actions";
import { createApi } from "unsplash-js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const unsplash = createApi({
  accessKey: "3pjTnGVYq06KJubS-EJbHamsO9Sgy1Bw2p0l5ePUFM8",
});

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState([]);
  const [err, setError] = useState(false);

  const dispatch = useDispatch();

  const searched = useSelector((store: any) => store.lastSearch);

  const searchImgs = () => {
    if (searchValue !== "") {
      setResult([]);
      unsplash.search
        .getPhotos({
          query: searchValue,
          page: 1,
          perPage: 10,
        })
        .then((response) => {
          if (response.status === 200) {
            setError(false);
            return response?.response?.results;
          }
        })
        .then((json: any) => {
          if (json?.length === 0) {
            setError(true);
          } else {
            setResult(json);
            dispatch(lastSearch(searchValue));
          }
        })
        .catch((err) => setError(true));
      setSearchValue("");
    }
  };

  const searchItems = searched.map((i: any, idx: number) => (
    <div key={idx}>{i}</div>
  ));

  return (
    <div>
      <Container>
        <Row className="search-block">
          <Form.Group>
            <div className="search">
              <div className="search-input">
                <Form.Control
                  value={searchValue}
                  type="text"
                  placeholder="Search 10 photos"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchValue(e.target.value)
                  }
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    console.log(e);
                    if (e.keyCode === 13) {
                      searchImgs();
                    }
                  }}
                />
              </div>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  searchImgs();
                }}
              >
                Search
              </Button>
            </div>
            <div className="search-history">
              {searched.length !== 0 && <div>Search history:</div>}
              <div className="search-history-items">
                {searchItems?.map((item: any, idx: number) => (
                  <div className="search-history-item" key={idx}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Form.Group>
          {err && (
            <Alert variant="danger" className="err-form">
              Sorry, something went wrong. Please try again.
            </Alert>
          )}
        </Row>
        <Row>
          {result?.map((item: any, idx: number) => (
            <Col key={idx} className="img-cell">
              <Image src={item.urls.full} height="200px" width="auto" rounded />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SearchForm;

