# 微分熵

$$
h(X) = \int_{-\infty}^{\infty}f(x)log\frac{1}{f(x)} = E[log\frac{1}{f(x)}]
$$

## Properties

1. $Y = X + a, \space h(Y) = h(X)$

2. According to 3,4, we have 
   $$
   h(X) \leq \frac{1}{2}log(2\pi e \mathcal{Var(X)})
   $$

3. Enhanced Version of 4.

   Gaussian Vector $(X_1, X_2, X_3,...,X_n)$ with covariance matrix K. 
   $$
   h(X_1,X_2,...,X_n) = \frac{1}{2}log(2\pi e|K|)
   $$
   
4. When K is a full rank matrix
   $$
   h(KX) = h(X) + log(|det(X)|)
   $$

5. Divergence: $D(p||q) = \int p log\frac{p}{q}$

6. $h(X_1,X_2,...,X_n) = \sum_{i=1}^{n}h(X_i|X^{i-1})$

7. $I(X;Y) = -h(X,Y) + h(X) + h(Y)$.

8. Entropy Power Inequality 

    Let $X-f(x)$ and $Z - g(z)$ be independent random variable and $Y = X + Z$, then 
    $$
    x^{2h(Y)} \geq 2^{2h(X)} + 2^{2h(Z)}
    $$
    Equality holds when $X,Z$ are gaussian.