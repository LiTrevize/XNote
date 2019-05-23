# 微分熵

$$
h(X) = \int_{-\infty}^{\infty}f(x)log\frac{1}{f(x)} = E[log\frac{1}{f(x)}]
$$

## Properties

1. $Y = X + a, \space h(Y) = h(X)$

2. $Y=aX, \space h(Y) = h(X) + log|a|$
   $$
   \begin{array}{lll}
   	Pr(Y \leq y) & = & Pr(aX \leq y) \\
   	g(y) &  =  &\frac{1}{a}f(\frac{y}{a})\\
   	h(Y) & = & \int g(y)log\frac{1}{g(y)}dy \\
   	 & = & \int f(\frac{y}{a})log\frac{a}{f(\frac{y}{a})}d\frac{y}{a}\\
   	 & = & h(X)+log|a|
   \end{array}
   $$

3. For the same $Var(X)$. Gaussian Distortion maximize entropy.

   **Proof**: Assume we have two pdf f(x) and g(x), such that $\int x^2f(x)dx = \int x^2g(x)dx$ and $\int xf(x)dx = \int x g(x)dx = 0$.
   $$
   f(x) = \frac{1}{\sqrt{2\pi \delta}} e^{-\frac{x^2}{2\delta^2}}\\
   \begin{array}{lll}
   	D(g||f)& = &\int g\space log\frac{g}{f} \\
   	 & = & \int g\space log(g) - \int g\space log(f)\\
   	 \int g \space log(f) & = & \int g(x) log(\frac{1}{\sqrt{2\pi \delta}}) dx+ \int g(x)(-\frac{x^2}{2\delta ^2}) dx \\
   	 & = & \int f(x) log(\frac{1}{\sqrt{2\pi \delta}}) dx+ \int f(x)(-\frac{x^2}{2\delta ^2}) dx \\
   	 & = & \int f(x)log(f(x)) \\
   	D(g||f) & = &  h(f) - h(g) \geq 0 \\
   \end{array}
   $$
   
4. Differential Entropy of Gaussian Random Variable
   $$
   f(x) = \frac{1}{\sqrt{2 \pi \delta^2}}\space e^{-\frac{x^2}{2\delta^2}}\\
   	\begin{array}{lll}
   		h(f) & = & -\int f(x)log \space \frac{1}{\sqrt{2\pi \delta^2}}dx + \int f(x)(\frac{x^2}{2\delta^2}) log(e)dx \\
   		& = & \frac{log(e)}{2\delta^2}\int f(x)x^2dx + \frac{1}{2} log 2\pi \delta^2 \\
   		& = & \frac{log(e)}{2} + \frac{1}{2}log(2\pi\delta^2)\\
   		& = & \frac{1}{2}log(2\pi e \delta^2)
   	\end{array}
   $$
   
5. According to 3,4, we have 
   $$
   h(X) \leq \frac{1}{2}log(2\pi e \mathcal{Var(X)})
   $$

6. Enhanced Version of 4.

   Gaussian Vector $(X_1, X_2, X_3,...,X_n)$ with covariance matrix K. 
   $$
   h(X_1,X_2,...,X_n) = \frac{1}{2}log(2\pi e|K|)
   $$
   
7. When K is a full rank matrix
   $$
   h(KX) = h(X) + log(|det(X)|)
   $$

8. Divergence: $D(p||q) = \int p log\frac{p}{q}$

9. $h(X_1,X_2,...,X_n) = \sum_{i=1}^{n}h(X_i|X^{i-1})$

10. $I(X;Y) = -h(X,Y) + h(X) + h(Y)$.

11. Entropy Power Inequality 

    Let $X-f(x)$ and $Z - g(z)$ be independent random variable and $Y = X + Z$, then 
    $$
    x^{2h(Y)} \geq 2^{2h(X)} + 2^{2h(Z)}
    $$
    Equality holds when $X,Z$ are gaussian.