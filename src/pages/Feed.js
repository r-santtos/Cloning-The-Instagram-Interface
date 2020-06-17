import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Image, ActivityIndicator } from 'react-native';

function Feed() {
    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function loadPage(pageNumber = page, shoulRefresh = false) {
      if (total && pageNumber > total) return;

      setLoading(true);

      const response = await fetch(
          `http://192.168.0.192:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`
        );

      const data = await response.json();
      const totalItems = response.headers.get('X-Total-Count');

      setTotal(Math.floor(totalItems / 5));
      setFeed(shoulRefresh ? data : [... feed, ... data]);
      setPage(pageNumber + 1);
      setLoading(false);
    }

    /** Fazendo a chamada para api */
    useEffect(() => {
        loadPage();
    }, []);

    async function refreshList() {
      setRefreshing(true);

      await loadPage(1, true);

      setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={feed}
                keyExtractor={post => String(post.id)}
                onEndReached={() => loadPage()}

                onRefresh={refreshList}
                refreshing={refreshing}

                ListFooterComponent={
                  loading && <ActivityIndicator 
                    style={styles.loadin}
                    size="small"
                    color="#999"
                  />
                }

                onEndReachedThreshold={0.1}

                renderItem={({ item }) => (
                    <View style={styles.post}>

                        {/** Header Post */}
                        <View style={styles.header}>
                            <Image source={{ uri: item.author.avatar }} style={styles.avatar} />

                            <Text style={styles.name}>{item.author.name}</Text>                        
                        </View>

                        {/** Image Post */}
                        <Image 
                            style={styles.postImg}
                            smallSource={{ uri: item.small}}
                            source={{ uri: item.image}}
                        />

                        {/** Description Post */}
                        <View style={styles.description}>
                            <Text style={styles.name}>{item.author.name}</Text>
                            <Text>{item.description}</Text>  
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  post: {
    marginTop: 10,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#333',
  },
  postImg: {
    width: '100%',
    aspectRatio: 0.834,
  },
  description: {
      padding: 15,
      lineHeight: 18,
  },
});

export default Feed;
