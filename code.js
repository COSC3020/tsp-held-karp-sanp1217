function tsp_hk(distance_matrix) {
  const numberOfCities = distance_matrix.length;
  const subsets = generateSubsets(numberOfCities);
  const shortestDistances = new Array(subsets.length)
    .fill(null)
    .map(() => new Array(numberOfCities).fill(Infinity));

  //distance between starting city (city 0) and itself is 0
  shortestDistances[1][0] = 0;

  //Iterate through each subset of cities to visit
  for (let i = 0; i < subsets.length; i++) {
    const subset = subsets[i];

    //Iterate through each city in the current subset
    for (let j = 0; j < subset.length; j++) {
      const city = subset[j];

      //Iterate through each possible next city to visit
      for (let k = 0; k < subset.length; k++) {
        const nextCity = subset[k];

        if (nextCity !== city) {
          //Compute the distance between the current city and the next city
          const distance =
            shortestDistances[
              getSubsetIndex(
                subsets,
                subset.filter((c) => c !== city)
              )
            ][nextCity] + distance_matrix[nextCity][city];

          //Update the shortest distance if the new distance is smaller
          shortestDistances[i][city] = Math.min(
            shortestDistances[i][city],
            distance
          );
          //console.log(shortestDistances);
        }
      }
    }
  }

  //Find the minimum distance among all possible routes that visit all cities exactly once
  let minDistance = Infinity;
  for (let i = 0; i < numberOfCities; i++) {
    minDistance = Math.min(
      minDistance,
      shortestDistances[subsets.length - 1][i]
    );
  }
  return minDistance;
}

function generateSubsets(n) {
  const subsets = [[]];
  for (let i = 1; i < Math.pow(2, n); i++) {
    const subset = [];
    for (let j = 0; j < n; j++) {
      if ((i & Math.pow(2, j)) !== 0) {
        subset.push(j);
      }
    }
    subsets.push(subset);
  }
  return subsets;
}

function getSubsetIndex(subsets, subset) {
  for (let i = 0; i < subsets.length; i++) {
    if (arraysEqual(subsets[i], subset)) {
      return i;
    }
  }
}

function arraysEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
