import React, { Component, lazy, memo, Suspense, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

const Greeting = ({ name }: { name: string }) => {
    return (
        <View>
            <Text>Hello, {name}!</Text>
        </View>
    );
};


type BoxProps = {
    children: React.ReactNode,
    ch2?: React.ReactNode,

}

const Box = ({ children, ch2}: {children : React.ReactNode, ch2?: React.ReactNode}) => {
    return <View>
        {children}
        {ch2}
    </View>;
};

const App = () => {
    return (
        <Box>
            <Text>This is inside the box!</Text>
        </Box>
    );
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

    render() {
        return (<View>
            <Text>{this.state.property1}</Text>
            <Text>{this.state.property2}</Text>
            <Button
                title={this.state.property1}
                onPress={this.increment}
            />


        </View>)
    }

    increment() {
        this.setState((prev) => ({ property2: prev.property2 + 1 }))
    }


    componentDidMount(): void {
        // load initial data - usecase, repository, api call
    }



    defaultState() {
        this.setState({ property1: "", property2: 0 })
    }

    componentWillUnmount() {
        this.defaultState()
    }

}


export const LifecycleExample: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [count, setCount] = useState(0);

    // Equivalent to componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log('Component mounted or updated');
        return () => {
            console.log('Component unmounted'); // Equivalent to componentWillUnmount
        };
    }, [count]); // Dependency array controls when this effect runs

    return (
        <View>
            <ClassExample />
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
const LazyLoadedComponent = lazy(() => import('./LazyComponent'));

const App2 = () => {
  return (
    <View>
      <Text>Welcome to React Native!</Text>
      {/* Suspense for handling loading state */}
      <Suspense fallback={<Text>Loading...</Text>}>
        <LazyLoadedComponent />
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

