






# The upper bound of cardinality

Firstly, we prove the proposition as below.

**Proposition**: For any $x \in \mathcal{X}$, if $x \in T^n_{\delta}(X)$, then $x \in A^n_{\epsilon}(X)$, where $\epsilon(\delta) \rightarrow 0$ as $\delta \rightarrow 0$.

**Proof**

1. If $x \in T^n_{\delta}$.  As we know, we have

$$
2^{-n(H(X) + \epsilon)} \leq p(x) \leq 2^{-n(H(X)-\epsilon)}
$$

2. This is equivalent to

$$
H(X) - \epsilon \leq -\frac{1}{n}log \space p(x) \leq H(X) + \epsilon
$$

3. $x \in A^n_{\epsilon}$.

**Qed.**

Suppose $x^n \in T_{\delta'}(X) \sube T_{\delta}(X)$ and $y^n \in T_{\delta}(Y|x^n)$, then by definition of the conditional typical set, $(x^n,y^n) \in T_{\delta}(X,Y)$. Since we have proved that strong typicality implies weak typicality,
$$
(1-\delta)H(X,Y) \leq -\frac{1}{n}log\space p(x^n,y^n) \leq (1+\delta)H(X,Y)\\
(1-\delta) H(X) \leq -\frac{1}{n}log \space p(x^n) \leq (1+\delta)H(X)
$$
So fix some $x^n \in T_{\delta'}(X)$. Then 
$$
\begin{array}{lll}
1 & \geq & \sum\limits_{y^n \in T_{\delta}(Y|x^n)} p(y^n|x^n)\\
 & = & \sum\limits_{y^n \in T_{\delta}(Y|x^n)}  \frac{p(x^n,y^n)}{p(x^n)} \\
 & \geq & |T_{\delta}(Y|x^n)|·2^{-n(H(X,Y) - H(X)+\epsilon(\delta))} \\
 & = & |T_{\delta}(Y|x^n)|·2^{-n(H(Y|X)+\epsilon(\delta))}
\end{array}\\
\rArr |T_{\delta}(Y|x^n)| \leq 2^{n(H(Y|X)+\epsilon(\delta))}
$$


# The upper bound and lower bound of possibility

Fix any $\delta > 0$ and $\delta' < \delta$ and fix $x^n \in T_{\delta '}(X)$. Choose $\hat{Y}^n \in \mathcal{Y}^n$ by choosing each $\hat{Y}_i$ i.i.d. according to the marginal distribution $p(y)$.  Then noting that 
$$
y^n \in T_{\delta}(Y|x^n) \rArr y^n \in T_{\delta}(Y) \rArr p(y^n) \leq 2^{-n(H(y)-\epsilon(\delta))}
$$


where $\epsilon (\delta)$ is a function that approaches 0 as $\delta \rightarrow 0$, we have
$$
\begin{array}{lll}
P(\hat{Y}^n \in T_{\delta}(Y|x^n)) & = & P((x^n,\hat{Y}^n) \in T_{\delta}(X,Y)) \\
& = & \sum\limits_{y^n \in T_{\delta}(Y|x^n)} p(y^n) \\
& \leq & |T_{\delta}(Y|x^n)|· 2^{-n(H(Y) - \epsilon(\delta))} \\
& \leq & 2^{n(H(Y|X) + \epsilon(\delta))} · 2^{-n(H(Y) - \epsilon(\delta))}\\
& = & 2^{-n[I(X;Y)-\tilde{\epsilon}(\delta)]}
\end{array}
$$
where $\tilde{\epsilon}(\delta) \rightarrow 0$ as $\delta \rightarrow 0$.

Conversely, we can derive the lower bound as below
$$
\begin{array}{lll}
P(\hat{Y}^n \in T_{\epsilon}(Y|x^n)) & = & P((x^n,\hat{Y}^n) \in T_{\delta}(X,Y)) \\
& = & \sum\limits_{y^n \in T_{\delta}(Y|x^n)} p(y^n) \\
& \geq & |T_{\delta}(Y|x^n)|· 2^{-n(H(Y) + \epsilon(\delta))} \\
& \geq & 2^{n(H(Y|X) - \epsilon(\delta))} · 2^{-n(H(Y) + \epsilon(\delta))}\\
& = & 2^{-n[I(X;Y)+\tilde{\epsilon}(\delta)]}
\end{array}
$$

