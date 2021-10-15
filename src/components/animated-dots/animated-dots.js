import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Animated } from "react-native";
import styles from "./animated-dots.style";

class AnimatedDots extends Component {
  constructor(props) {
    super(props);

    this._animation_state = {
      dot_opacities: this.initializeDots(),
      should_animate: true,
    };
  }

  initializeDots() {
    let opacities = [];

    for (let i = 0; i < this.props.numberOfDots; i++) {
      let dot = new Animated.Value(this.props.minOpacity);
      opacities.push(dot);
    }

    return opacities;
  }

  componentDidMount() {
    this.animate_dots(0);
  }

  componentWillUnmount() {
    this._animation_state.should_animate = false;
  }

  animate_dots(which_dot) {
    if (!this._animation_state.should_animate) return;

    // swap fade direction when we hit end of list
    if (which_dot >= this._animation_state.dot_opacities.length) {
      which_dot = 0;
    }

    let prev_dot = (which_dot - 1) < 0 ? this._animation_state.dot_opacities.length - 1 : (which_dot - 1);
    let next_dot = which_dot + 1;

    Animated.parallel([
      Animated.timing(this._animation_state.dot_opacities[prev_dot], {
        toValue: 0,
        duration: this.props.animationDelay,
        useNativeDriver: false,
      }),
      Animated.timing(this._animation_state.dot_opacities[which_dot], {
        toValue: 1,
        duration: this.props.animationDelay,
        useNativeDriver: false,
      })
    ]).start(() => {
      this.animate_dots(next_dot);
    });
  }

  render() {
    return (
      <View style={styles.container}>
      {this._animation_state.dot_opacities.map((opacity, index) => {
        return <Animated.View key={index} style={[styles.dot, this.props.style, {opacity: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [this.props.minOpacity, 1],
        })}]}/>
      })}
      </View>
    );
  }
};

AnimatedDots.propTypes = {
  numberOfDots: PropTypes.number,
  animationDelay: PropTypes.number,
  minOpacity: PropTypes.number,
  style: PropTypes.any,
};

AnimatedDots.defaultProps = {
  numberOfDots: 3,
  animationDelay: 300,
  minOpacity: 0.2,
  style: {},
};

export default AnimatedDots;
