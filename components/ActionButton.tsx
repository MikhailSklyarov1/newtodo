import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface Props {
    onPress: () => void;
    action: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const ActionButton: React.FC<Props> = ({ onPress, action }) => {
    return (
        <TouchableOpacity style={styles.button_add} onPress={onPress}>
            <Text style={styles.button_text}>{action}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button_add: {
        backgroundColor: '#DAAD86',
        borderRadius: 100,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button_text: {
        fontSize: 25,
    },
});

export default ActionButton;
