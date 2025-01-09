import React, { Component, lazy, memo, Suspense, useEffect, useState } from 'react';
import { Appearance, Button, Text, View } from 'react-native';

const Greeting = ({ name }: { name: string }) => {
    return (
        <View>
            <Text>Hello, {name}!</Text>
        </View>
    );
};


type BoxProps = {
    children: React.ReactNode,
    a?: React.ReactNode,

}

export const Box = ({ children, ch2 =<Text>DefaultText</Text>}: {children : React.ReactNode, ch2?: React.ReactNode}) => {
    return <View>
        {children}
        {ch2}
    </View>;
};


type State = {
    property1: string,
    property2: number
}

export class ClassExample extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            property1: "text",
            property2: 0,
        };
    }

    componentDidMount() {}
    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<State>, snapshot?: any) {}
    componentWillUnmount() {
    }
    render() {
        return (<View>
            <Text>{this.state.property1}</Text>
            <Text>{this.state.property2}</Text>
            <Button title="increment" onPress={this.increment}/>
        </View>)
    }

    increment() {
        this.setState((prev) => ({ property2: prev.property2 + 1 }))
    }
    
    defaultState() {
        this.setState({ property1: "", property2: 0 })
    }
}


export const LifecycleExample: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        //componentDidMount/componentDidUpdate
        return () => {
             //componentWillUnmount
        };
    }, [count]); //Dependency array controls when this effect runs

    return (
        <View>
            <Text onPress={() => setCount(count + 1)}>Count: {count}</Text>
            {children}
        </View>
    ); 
};

// memmo
const MyComponent = ({ value }: {value: string}) => {
  console.log('Rendering:', value);
  return (<Text>{value}</Text>);
};

// Wrap the component with React.memo
const MemoizedComponent = memo(MyComponent);


// Lazy loading a component
// const LazyLoadedComponent = lazy(() => import('./LazyComponent'));

const App2 = () => {
  return (
    <View>
      <Text>Welcome to React Native!</Text>
      {/* Suspense for handling loading state */}
      <Suspense fallback={<Text>Loading...</Text>}>
        {/* <LazyLoadedComponent /> */}
      </Suspense>
    </View>
  );
};


// dynamic component loader
const DynamicComponentLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadComponent = async () => {
    // const { default: DynamicComponent } = await import('./DynamicComponent');
    setIsLoaded(true);
  };

  return (
    <View>
      <Button title="Load Dynamic Component" onPress={loadComponent} />
      {/* {isLoaded ? <DynamicComponent /> : <Text>Component not loaded</Text>} */}
    </View>
  );
};


// light dark mode
const [theme, setTheme] = useState(Appearance.getColorScheme())

useEffect(()=> {
    Appearance.addChangeListener(({colorScheme})=> {
        setTheme(colorScheme)
    })
})

//  theme === 'dark' ? styles.darkBackground : styles.lightBackground,

