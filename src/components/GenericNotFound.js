function GenericNotFound() {
  return (
    <div className="container">
      <h1>Something's wrong here</h1>
      <p>
        This is a 404 error, which means you've clicked on a bad link or entered
        an invalid URL. Maybe what you are looking for can be found at{" "}
        <a href="http://localhost:3000">localhost</a>.
      </p>
    </div>
  );
}

export default GenericNotFound;
