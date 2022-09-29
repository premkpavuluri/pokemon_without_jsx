const Loading = (props) => React.createElement('div', null, 'Loading...');

const PokemonInfo = ({ name, imageURL }) =>
  React.createElement('figure', null,
    React.createElement('figcaption', null, name),
    React.createElement('img', { src: imageURL })
  );

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, pokemonInfo: null };
  }

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonId}`)
      .then(pokemonDetails => pokemonDetails.json())
      .then(({ name, sprites }) => {
        this.setState(() =>
          ({ loading: false, pokemonInfo: { name, imageURL: sprites.front_default } }));
      });
  }

  render() {
    return this.state.loading ?
      React.createElement(Loading) :
      React.createElement(PokemonInfo, { ...this.state.pokemonInfo });
  }
}

class Pokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadUpto: 10 };
    this.loadMore = this.loadMore.bind(this);
    this.reset = this.reset.bind(this);
  }

  loadMore() {
    this.setState(({ loadUpto }) => ({ loadUpto: loadUpto + 5 }));
  }

  reset() {
    this.setState(({ loadUpto }) => ({ loadUpto: 10 }));
  }

  render() {
    const pokemonIds = new Array(this.state.loadUpto).fill(1).
      map((_, index) => index + 1);

    const pokemons = pokemonIds.map(id =>
      React.createElement(Pokemon, { key: id, pokemonId: id }));

    return React.createElement('div', null,
      React.createElement('div', { className: 'pokemons' }, pokemons),
      React.createElement('button', { onClick: this.loadMore }, 'Load more'),
      React.createElement('button', { onClick: this.reset }, 'reset')
    );
  }
}

const main = () => {
  const container = document.querySelector("#page-wrapper");
  const root = ReactDOM.createRoot(container);

  root.render(React.createElement(Pokemons));
};

window.onload = main;
