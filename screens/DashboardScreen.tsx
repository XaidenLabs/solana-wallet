import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import {
  Background2 as Background,
  PriceHeader,
  Button,
  Title,
  Paragraph,
} from "../components";
import { Avatar, Card, Menu, useTheme } from "react-native-paper";
import { Navigation } from "../types";
import { useFocusEffect } from "@react-navigation/native";

import { useStoreState } from "../hooks/storeHooks";

import { accountFromSeed } from "../utils";
import {
  SPL_TOKEN,
  getBalance,
  getHistory,
  getSolanaPrice,
  getTokenBalance,
} from "../api";

type Props = {
  navigation: Navigation;
};

import { maskedAddress } from "../utils";
import { ScrollView } from "react-native-gesture-handler";
import CenterScrollers from "../components/CenterScrollers";
// import Solana from '../assets/images/solana.png';

const DashboardScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();

  const wallet = useStoreState((state) => state.wallet);
  const accounts = useStoreState((state) => state.accounts);

  const [account, setAccount] = useState({});

  useEffect(() => {
    async function generate() {
      const currentAccount = accounts[0];
      setAccount({
        index: currentAccount.index,
        title: currentAccount.title,
        keyPair: accountFromSeed(
          wallet.seed,
          currentAccount.index,
          currentAccount.derivationPath,
          0
        ),
      });
    }

    generate();
  }, []);

  const [balance, setBalance] = useState({
    usd: 0.0,
    sol: 0,
  });

  // const [history, setHistory] = useState("");

  useFocusEffect(
    useCallback(() => {
      async function getAsyncBalance() {
        if (account?.keyPair?.publicKey?.toString()) {
          const sol = await getBalance(account.keyPair.publicKey.toString());
          const usdPrice = await getSolanaPrice();

          setBalance({
            sol,
            usd: (sol * usdPrice).toFixed(2),
          });
        }
      }
      getAsyncBalance();
    }, [account])
  );

  // useEffect(() => {
  //   async function generate() {
  //     const _history = await getHistory(wallet.account);
  //     console.log(_history);
  //   }
  //
  //   generate();
  // }, []);

  // console.log(account.keyPair.publicKey.toString());

  // Menu
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeAccount = (index: number) => {
    const currentAccount = accounts[index];
    setAccount({
      index: currentAccount.index,
      title: currentAccount.title,
      keyPair: accountFromSeed(
        wallet.seed,
        currentAccount.index,
        currentAccount.derivationPath,
        0
      ),
    });
    closeMenu();
  };

  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    async function getBalance() {
      const balance = await getTokenBalance(
        account.keyPair.publicKey.toString(),
        SPL_TOKEN
      );
      setTokenBalance(balance);
    }

    if (Object.keys(account).length > 0) {
      // getBalance();
    }
  }, [account]);

  return (
      <Background navigation={navigation}>

      <View style={styles.container}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button onPress={openMenu}>{`${account?.title} address`}</Button>
            }
          >
            {accounts.map((account) => (
              <Menu.Item
                key={account.index}
                onPress={() => changeAccount(account.index)}
                title={account.title}
                titleStyle={{ color: colors.primary }}
              />
            ))}
          </Menu>
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("Receive")}
          >
            <Card.Title
              title={maskedAddress(account?.keyPair?.publicKey?.toString())}
              titleStyle={{ fontSize: 14 }} 
              left={(props) => <Avatar.Icon {...props} icon="qrcode" size={30} />}
            />
          </Card>
        </View>

        <PriceHeader style={styles.walletBalance} usd={balance.usd} sol={balance.sol} />


        {/* < CenterScrollers /> */}
        <View style={styles.Tokens}>
          <Text style={styles.tokens}>Tokens</Text>
        </View>

        {/* Center Scroller */}
        {/* <ScrollView style={styles.centerScrollers} contentContainerStyle={styles.scrollViewContent}> */}
          <View style={styles.centerScroller}>
            <Image 
              source={require ('../assets/images/solana.png')}
              style={{width: 35, height: 35}}
            />
            <View style={{marginLeft: 10}}>
              <Text style={[styles.down, styles.text]}>Solana</Text>
              <Text style={{color: '#fff'}}>{balance.sol} SOL</Text>
            </View>
            
          </View>

          <CenterScrollers />
      </Background>

  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: 'center'
    // marginTop: 50,
  },
  container1: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    
  },
  down: {
    color: '#fff',
    fontSize: 20,

  },
  amountText: {
    color: '#fff',
    marginLeft: 170,

  },
  walletBalance: {
    top: 0,
  },

  card: {
    width: "100%",
    top: 0,
    justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 85,
    marginTop: -30,
    backgroundColor: "rgba(52, 52, 52, 0.0)",
  },
  Tokens: {
    marginTop: 40,
  },
  tokens: {
    width: "100%",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30
  },
//   scrollViewContent: {
//     // Ensures ScrollView takes the full height of the container
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
// },
  centerScrollers: {
    marginTop: 10,
    width: '100%',

  },
  centerScroller: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    // height: 80,
    backgroundColor: 'rgba(52, 52, 52, 3)',
    borderRadius: 10,
  },
  // image: {
  //   width: 5,
  //   height: 5
  // },
  text: {
    color: '#fff',
  },
 
});

export default DashboardScreen;
