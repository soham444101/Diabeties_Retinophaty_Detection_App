import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Menu } from 'react-native-paper';

const LocationDropdown = ({ onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState('');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (loc) => {
    setLocation(loc);
    onSelect(loc);
    closeMenu();
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TextInput
            label="Select Location"
            value={location}
            onFocus={openMenu}
            style={{ marginBottom: 10 }}
            right={<TextInput.Icon icon="menu-down" />}
          />
        }>
        <Menu.Item onPress={() => handleSelect('City A')} title="City A" />
        <Menu.Item onPress={() => handleSelect('City B')} title="City B" />
        <Menu.Item onPress={() => handleSelect('City C')} title="City C" />
      </Menu>
    </View>
  );
};

export default LocationDropdown;
