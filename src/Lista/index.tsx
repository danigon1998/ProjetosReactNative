import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, Text, View, Image} from "react-native";

interface IState{
  feed: IUsuario
}

interface IProps{
    data: IUsuario
}

class Lista extends Component<IProps,IState>{
    constructor(props: IProps){
        super(props);
        this.state = {
            feed: this.props.data
        }
        this.mostraLikes = this.mostraLikes.bind(this);
        this.like = this.like.bind(this);
        this.carregaIcone = this.carregaIcone.bind(this);
    }

    mostraLikes(likers: number){
        let feed = this.state.feed;

        if(feed.likers <= 0){
            return;
        }
        return(
            <Text style={styles.likes}>
                {feed.likers} {feed.likers <= 1 ? 'curtida' : 'curtidas'}
            </Text>
        );
    }

    like(){
        let feed = this.state.feed;

        if(feed.likeada === true){
            this.setState({
                feed: {
                    ...feed,
                    likeada: false,
                    likers: feed.likers - 1
                }
            });
        }else{
            this.setState({
                feed: {
                    ...feed,
                    likeada: true,
                    likers: feed.likers + 1
                }
            });
        }
    }

    carregaIcone(likeada: boolean){
        return likeada ? require('../img/likeada.png') : require('../img/like.png');
    }

    render(): React.ReactNode {
        return(
            <View style={styles.areaFeed}>
                <View style={styles.viewPerfil}>
                    <Image
                    source={{uri:this.state.feed.imgPerfil}}
                    style={styles.fotoPerfil}
                    />
                    <Text style={styles.nomeUsuario}>
                    {this.state.feed.nome}
                    </Text>
                </View>
                <Image
                resizeMode="cover"
                style={styles.fotoPublicacao}
                source={{uri:this.state.feed.imgPublicacao}}
                />

                <View style={styles.areaBtn}>
                    <TouchableOpacity onPress={this.like}>
                        <Image
                        source={this.carregaIcone(this.state.feed.likeada)}
                        style={styles.iconeLike}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSend}>
                        <Image
                        source={require('../img/send.png')}
                        style={styles.iconeLike}
                        />
                    </TouchableOpacity>
                </View>

                {this.mostraLikes(this.state.feed.likers)}

                <View style={styles.viewRodape}>
                    <Text style={styles.nomeRodape}>
                        {this.state.feed.nome}
                    </Text>
                    <Text style={styles.descRodape}>
                        {this.state.feed.descricao}
                    </Text>
                </View> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    areaFeed: {
        
    },
    fotoPerfil: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    nomeUsuario: {
        fontSize: 22,
        textAlign: 'center',
        color: '#000'
    },
    fotoPublicacao: {
        flex: 1,
        height: 400,
        alignItems: 'center'
    },
    viewPerfil: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: 8
    },
    areaBtn: {
        flexDirection: 'row',
        padding: 5
    },
    iconeLike: {
        width: 33,
        height: 33
    },
    btnSend: {
        paddingLeft: 5
    },
    viewRodape: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nomeRodape: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 5,
        color: '#000'
    },
    descRodape: {
        paddingLeft: 5,
        fontSize: 15,
        color: '#000'
    },
    likes: {
        fontWeight: 'bold',
        marginLeft: 5
    }
})

export default Lista;